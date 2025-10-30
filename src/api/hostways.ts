import { ReviewsResponse, Review, ReviewCategory } from "../types/review";

const token = import.meta.env.VITE_HOSTAWAY_TOKEN;               
const apiBase = import.meta.env.VITE_HOSTAWAY_API_BASE || "https://api.hostaway.com/v1";

type Primitive = string | number | boolean | undefined | null;
type QueryVal = Primitive | Primitive[];

export type FetchReviewsOptions = {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  listingMapIds?: (string | number)[];
  reservationId?: string | number;
  type?: string | number;
  statuses?: (string | number)[];
  [key: string]: QueryVal;
};

function buildUrl(base: string, path: string, params: Record<string, QueryVal> = {}) {
  const url = new URL(path, base);
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
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
      continue;
    }

    const text = await resp.text().catch(() => "");
    throw new Error(`Hostaway error ${resp.status}: ${text || resp.statusText}`);
  }
  throw lastErr instanceof Error ? lastErr : new Error("Failed to fetch after retries");
}

/** Map ONE Hostaway review object -> your Review type (defensive mapping) */
function normalizeHostawayReview(r: any): Review {
  // categories often arrive as array OR object {cleanliness: 10, ...}
  let cats: ReviewCategory[] = [];
  const rawCats = r?.categories ?? r?.reviewCategory ?? r?.categoryRatings ?? r?.ratings;
  if (Array.isArray(rawCats)) {
    cats = rawCats
      .map((c: any) => ({
        category: String(c?.category ?? c?.name ?? c?.key ?? "overall"),
        rating: Number(c?.rating ?? c?.score ?? c?.value ?? 0),
      }))
      .filter((c: ReviewCategory) => Number.isFinite(c.rating));
  } else if (rawCats && typeof rawCats === "object") {
    cats = Object.entries(rawCats).map(([k, v]) => ({
      category: k,
      rating: Number(v as any),
    }));
  }

  const first = r?.guestFirstName ?? r?.firstName ?? r?.guest?.firstName;
  const last = r?.guestLastName ?? r?.lastName ?? r?.guest?.lastName;
  const guestName =
    r?.guestName ||
    [first, last].filter(Boolean).join(" ").trim() ||
    r?.author ||
    "Guest";

  const listingName =
    r?.listingName || r?.listing?.name || (r?.listingId ? `Listing ${r.listingId}` : "Listing");

  // Accept various date keys; keep string to match your type
  const submittedAt =
    r?.submittedAt ||
    r?.created ||
    r?.createdAt ||
    r?.insertedAt ||
    new Date().toISOString();

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

/** Fetch ONE page from Hostaway /reviews */
export async function fetchReviewsHostaway(opts: FetchReviewsOptions = {}): Promise<ReviewsResponse> {
  if (!token) {
    throw new Error(
      "VITE_HOSTAWAY_TOKEN missing. For production, proxy this call via your backend and keep the token server-side."
    );
  }
  const url = buildUrl(apiBase, "/reviews", { limit: 100, ...opts });

  const json = await fetchJsonWithRetries(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
    },
  });

  // Expecting { status: 'success', result: [...] }
  const result = Array.isArray(json?.result) ? json.result : [];
  const mapped: Review[] = result.map(normalizeHostawayReview);

  return { status: (json?.status as any) ?? "success", result: mapped };
}

/** Fetch ALL pages (optional helper) */
export async function fetchAllReviewsHostaway(
  baseOpts: Omit<FetchReviewsOptions, "offset" | "limit"> = {},
  pageSize = 100,
  maxPages = 50
): Promise<ReviewsResponse> {
  let all: Review[] = [];
  let offset = 0;
  for (let p = 0; p < maxPages; p++) {
    const page = await fetchReviewsHostaway({ ...baseOpts, limit: pageSize, offset });
    const items = page.result || [];
    all = all.concat(items);
    if (items.length < pageSize) break;
    offset += items.length;
  }
  return { status: "success", result: all };
}
