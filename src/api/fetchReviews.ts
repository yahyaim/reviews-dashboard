import type { ReviewsResponse } from "../types/review";

/** Fetches every page of reviews through the `/api/reviews` serverless proxy. */
export async function fetchAllReviews(
  params: Record<string, string | number> = {}
): Promise<ReviewsResponse> {
  const url = new URL("/api/reviews", window.location.origin);
  url.searchParams.set("all", "true");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));

  const res = await fetch(url);
  // `vite dev` has no serverless runtime and answers with JS or HTML instead.
  if (!res.headers.get("content-type")?.includes("application/json")) {
    throw new Error(`Reviews API unavailable (HTTP ${res.status})`);
  }
  const body = (await res.json()) as ReviewsResponse;
  if (!res.ok || body.status !== "success" || !Array.isArray(body.result)) {
    throw new Error(body.message || `Failed to fetch reviews (HTTP ${res.status})`);
  }
  return body;
}
