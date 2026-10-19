// /api/reviews.ts — Edge Runtime (no @vercel/node needed)
import type { Review, ReviewCategory, ReviewsResponse } from "../src/types/review";

export const config = { runtime: "edge" };

const token = process.env.HOSTAWAY_TOKEN;
const apiBase = process.env.HOSTAWAY_API_BASE || "https://api.hostaway.com/v1";

/** Query params forwarded to Hostaway. Anything else from the client is dropped. */
const FORWARDED_PARAMS = ["sortBy", "sortOrder", "listingMapIds", "reservationId", "type", "statuses"] as const;

const MAX_PAGE_SIZE = 100;
const MAX_PAGES = 20;
const MAX_RETRY_WAIT_MS = 5_000;

const clampInt = (raw: string | null, fallback: number, min: number, max: number) => {
  const n = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};

function buildUrl(path: string, params: Record<string, string | number>) {
  const url = new URL(path.replace(/^\//, ""), apiBase.endsWith("/") ? apiBase : `${apiBase}/`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  return url.toString();
}

async function fetchJsonWithRetries(input: string, init: RequestInit, attempts = 3, baseDelayMs = 700) {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    const resp = await fetch(input, init);
    if (resp.ok) return resp.json();

    if (resp.status === 429 || resp.status >= 500) {
      lastErr = new Error(`Hostaway retryable error ${resp.status}`);
      if (i === attempts - 1) break;
      const retryAfter = Number(resp.headers.get("retry-after")) * 1000;
      const waitMs = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : baseDelayMs * 2 ** i;
      // Stay well inside the edge function's time limit.
      await new Promise((r) => setTimeout(r, Math.min(waitMs, MAX_RETRY_WAIT_MS)));
      continue;
    }

    const text = await resp.text().catch(() => "");
    throw new Error(`Hostaway error ${resp.status}: ${text || resp.statusText}`);
  }
  throw lastErr instanceof Error ? lastErr : new Error("Failed to fetch after retries");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- untyped upstream payload
type Raw = Record<string, any>;

export function normalizeHostawayReview(r: Raw): Review | null {
  const rawId = r?.id ?? r?.reviewId ?? r?.reservationReviewId;
  const id = Number(rawId);
  if (!Number.isFinite(id)) return null;

  let cats: ReviewCategory[] = [];
  const rawCats = r?.reviewCategory ?? r?.categories ?? r?.categoryRatings ?? r?.ratings;
  if (Array.isArray(rawCats)) {
    cats = rawCats.map((c: Raw) => ({
      category: String(c?.category ?? c?.name ?? c?.key ?? "overall"),
      rating: Number(c?.rating ?? c?.score ?? c?.value),
    }));
  } else if (rawCats && typeof rawCats === "object") {
    cats = Object.entries(rawCats).map(([k, v]) => ({ category: k, rating: Number(v) }));
  }
  cats = cats.filter((c) => Number.isFinite(c.rating));

  const first = r?.guestFirstName ?? r?.firstName ?? r?.guest?.firstName;
  const last = r?.guestLastName ?? r?.lastName ?? r?.guest?.lastName;
  const guestName = r?.guestName || [first, last].filter(Boolean).join(" ").trim() || r?.author || "Guest";

  const listingName = r?.listingName || r?.listing?.name || (r?.listingId ? `Listing ${r.listingId}` : "Listing");

  const rating = Number(r?.rating ?? r?.overall);

  return {
    id,
    type: String(r?.type ?? r?.reviewType ?? "guest-to-host"),
    status: String(r?.status ?? "published"),
    rating: r?.rating == null && r?.overall == null ? null : Number.isFinite(rating) ? rating : null,
    publicReview: String(r?.publicReview ?? r?.comment ?? r?.text ?? ""),
    reviewCategory: cats,
    // Leave unknown dates empty rather than inventing "now".
    submittedAt: String(r?.submittedAt || r?.created || r?.createdAt || r?.insertedAt || ""),
    guestName,
    listingName,
    source: "Hostaway",
  };
}

function json(data: ReviewsResponse, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      // Only cache successes; an error cached at the CDN would outlive the outage.
      "cache-control": status === 200 ? "public, s-maxage=60, stale-while-revalidate=120" : "no-store",
    },
  });
}

const error = (message: string, status: number) => json({ status: "error", result: [], message }, status);

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "GET") return error("Method Not Allowed", 405);
  if (!token) return error("HOSTAWAY_TOKEN not set on server.", 500);

  try {
    const { searchParams } = new URL(req.url);
    const params: Record<string, string> = {};
    for (const key of FORWARDED_PARAMS) {
      const v = searchParams.get(key);
      if (v) params[key] = v;
    }

    const fetchPage = async (limit: number, offset: number) => {
      const body = await fetchJsonWithRetries(buildUrl("/reviews", { ...params, limit, offset }), {
        headers: { Authorization: `Bearer ${token}`, "Cache-Control": "no-cache" },
      });
      const raw: Raw[] = Array.isArray(body?.result) ? body.result : [];
      return {
        count: raw.length,
        reviews: raw.map(normalizeHostawayReview).filter((r): r is Review => r !== null),
      };
    };

    const offset = clampInt(searchParams.get("offset"), 0, 0, Number.MAX_SAFE_INTEGER);

    if (searchParams.get("all") === "true") {
      const pageSize = clampInt(searchParams.get("pageSize"), MAX_PAGE_SIZE, 1, MAX_PAGE_SIZE);
      const maxPages = clampInt(searchParams.get("maxPages"), MAX_PAGES, 1, MAX_PAGES);
      const all: Review[] = [];
      for (let p = 0, at = offset; p < maxPages; p++) {
        const page = await fetchPage(pageSize, at);
        all.push(...page.reviews);
        if (page.count < pageSize) break;
        at += page.count;
      }
      return json({ status: "success", result: all });
    }

    const limit = clampInt(searchParams.get("limit"), MAX_PAGE_SIZE, 1, MAX_PAGE_SIZE);
    const page = await fetchPage(limit, offset);
    return json({ status: "success", result: page.reviews });
  } catch (err) {
    // Log the upstream detail server-side; don't echo Hostaway's response to the browser.
    console.error("GET /api/reviews failed", err);
    return error("Failed to load reviews from Hostaway.", 502);
  }
}
