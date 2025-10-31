import type { ReviewsResponse } from "../types/review";

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
type QueryVal = string | number | boolean | undefined | null | (string | number | boolean | null | undefined)[];

function buildClientUrl(path: string, params: Record<string, QueryVal> = {}) {
  const url = new URL(path, window.location.origin);
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

export async function fetchReviews(opts: FetchReviewsOptions = {}): Promise<ReviewsResponse> {
  const url = buildClientUrl("/api/reviews", opts as any);
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to fetch reviews: ${res.status}`);
  }
  return res.json();
}

export async function fetchAllReviews(
  baseOpts: Omit<FetchReviewsOptions, "offset" | "limit"> = {},
  pageSize = 100,
  maxPages = 50
): Promise<ReviewsResponse> {
  const url = buildClientUrl("/api/reviews", { ...baseOpts, all: "true", pageSize, maxPages });
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to fetch reviews: ${res.status}`);
  }
  return res.json();
}
