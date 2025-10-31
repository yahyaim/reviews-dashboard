// /api/reviews.ts — Edge Runtime (no @vercel/node needed)
export const config = { runtime: "edge" };

// Minimal shared types
type Primitive = string | number | boolean | undefined | null;
type QueryVal = Primitive | Primitive[];

export type ReviewCategory = { category: string; rating: number };
export type Review = {
  id: number | string;
  type?: string;
  status?: string;
  rating?: number | null;
  publicReview?: string;
  reviewCategory?: ReviewCategory[];
  submittedAt?: string;
  guestName?: string;
  listingName?: string;
  source?: string;
};
export type ReviewsResponse = { status: "success" | "error" | string; result: Review[] };

const token = process.env.HOSTAWAY_TOKEN; //
const apiBase = process.env.HOSTAWAY_API_BASE || "https://api.hostaway.com/v1";

function buildUrl(base: string, path: string, params: Record<string, QueryVal> = {}) {
  const url = new URL(path, base);
  Object.entries(params).forEach(([k, v]) => {
    if (v == null) return;
    if (Array.isArray(v)) {
      if (v.length > 0) url.searchParams.set(k, v.join(","));
    } else {
      url.searchParams.set(k, String(v));
    }
  });
  return url.toString();
}

async function fetchJsonWithRetries(
  input: RequestInfo,
  init: RequestInit,
  attempts = 3,
  baseDelayMs = 700
) {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    const resp = await fetch(input, init);
    if (resp.ok) return resp.json();

    if (resp.status === 429 || (resp.status >= 500 && resp.status < 600)) {
      const retryAfter = resp.headers.get("retry-after");
      const waitMs = retryAfter ? Number(retryAfter) * 1000 : baseDelayMs * Math.pow(2, i);
      await new Promise((r) => setTimeout(r, isNaN(waitMs) ? baseDelayMs : waitMs));
      lastErr = new Error(`Hostaway retryable error ${resp.status}`);
      continue;
    }

    const text = await resp.text().catch(() => "");
    throw new Error(`Hostaway error ${resp.status}: ${text || resp.statusText}`);
  }
  throw lastErr instanceof Error ? lastErr : new Error("Failed to fetch after retries");
}

function normalizeHostawayReview(r: any): Review {
  let cats: ReviewCategory[] = [];
  const rawCats = r?.categories ?? r?.reviewCategory ?? r?.categoryRatings ?? r?.ratings;
  if (Array.isArray(rawCats)) {
    cats = rawCats
      .map((c: any) => ({
        category: String(c?.category ?? c?.name ?? c?.key ?? "overall"),
        rating: Number(c?.rating ?? c?.score ?? c?.value ?? 0),
      }))
      .filter((c) => Number.isFinite(c.rating));
  } else if (rawCats && typeof rawCats === "object") {
    cats = Object.entries(rawCats).map(([k, v]) => ({ category: k, rating: Number(v as any) }));
  }

  const first = r?.guestFirstName ?? r?.firstName ?? r?.guest?.firstName;
  const last = r?.guestLastName ?? r?.lastName ?? r?.guest?.lastName;
  const guestName = r?.guestName || [first, last].filter(Boolean).join(" ").trim() || r?.author || "Guest";

  const listingName =
    r?.listingName || r?.listing?.name || (r?.listingId ? `Listing ${r.listingId}` : "Listing");

  const submittedAt =
    r?.submittedAt || r?.created || r?.createdAt || r?.insertedAt || new Date().toISOString();

  return {
    id: Number(r?.id ?? r?.reviewId ?? r?.reservationReviewId ?? Date.now()),
    type: String(r?.type ?? r?.reviewType ?? "guest-to-host"),
    status: String(r?.status ?? "published"),
    rating: r?.rating != null ? Number(r?.rating) : (r?.overall != null ? Number(r?.overall) : null),
    publicReview: String(r?.publicReview ?? r?.comment ?? r?.text ?? ""),
    reviewCategory: cats,
    submittedAt: String(submittedAt),
    guestName,
    listingName,
    source: "Hostaway",
  };
}

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=60, stale-while-revalidate=120",
      ...init.headers,
    },
    statusText: init.statusText,
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "GET") {
    return json({ status: "error", message: "Method Not Allowed" }, { status: 405 });
  }

  if (!token) {
    return json({ status: "error", message: "HOSTAWAY_TOKEN not set on server." }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const params: Record<string, QueryVal> = {};
    for (const [k, v] of searchParams.entries()) {
      params[k] = v;
    }

    const all = params.all === "true";
    delete params.all;

    if (all) {
      const pageSize = Number(searchParams.get("pageSize") ?? 100);
      const maxPages = Number(searchParams.get("maxPages") ?? 50);
      let allReviews: Review[] = [];
      let offset = Number(searchParams.get("offset") ?? 0);

      for (let p = 0; p < maxPages; p++) {
        const url = buildUrl(apiBase, "/reviews", { ...params, limit: pageSize, offset });
        const jsonResp = await fetchJsonWithRetries(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        });

        const result = Array.isArray(jsonResp?.result) ? jsonResp.result : [];
        const mapped: Review[] = result.map(normalizeHostawayReview);

        allReviews = allReviews.concat(mapped);
        if (mapped.length < pageSize) break;
        offset += mapped.length;
      }

      return json({ status: "success", result: allReviews } satisfies ReviewsResponse);
    }

    // single page
    const url = buildUrl(apiBase, "/reviews", params);
    const jsonResp = await fetchJsonWithRetries(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      },
    });

    const result = Array.isArray(jsonResp?.result) ? jsonResp.result : [];
    const mapped: Review[] = result.map(normalizeHostawayReview);

    return json({ status: (jsonResp?.status as any) ?? "success", result: mapped } as ReviewsResponse);
  } catch (err: any) {
    return json({ status: "error", message: err?.message || "Unknown server error" }, { status: 500 });
  }
}
