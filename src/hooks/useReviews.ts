import { useCallback, useEffect, useState } from "react";
import type { Review } from "../types/review";
import { fetchAllReviews } from "../api/fetchReviews";
import { mockReviews } from "../mocks/reviews";

export type ReviewsState =
  | { status: "loading" }
  | { status: "ready"; reviews: Review[]; source: "live" | "sample"; notice?: string };

type Ready = Extract<ReviewsState, { status: "ready" }>;

// Shared across pages so navigating Dashboard ↔ Testimonials doesn't refetch.
let cache: Promise<Ready> | null = null;

function load(): Promise<Ready> {
  cache ??= fetchAllReviews({ sortOrder: "desc" })
    .then((res): Ready =>
      res.result.length
        ? { status: "ready", reviews: res.result, source: "live" }
        : {
            status: "ready",
            reviews: mockReviews,
            source: "sample",
            notice: "Hostaway returned no reviews, so sample data is shown.",
          }
    )
    .catch((err: unknown): Ready => {
      console.warn("Falling back to sample reviews:", err);
      return {
        status: "ready",
        reviews: mockReviews,
        source: "sample",
        notice: "Live reviews couldn't be loaded, so sample data is shown.",
      };
    });
  return cache;
}

export function useReviews() {
  const [state, setState] = useState<ReviewsState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    load().then((s) => alive && setState(s));
    return () => {
      alive = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    cache = null;
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  }, []);

  return { ...state, retry };
}
