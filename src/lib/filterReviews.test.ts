import { describe, expect, it } from "vitest";
import type { Review } from "../types/review";
import { DEFAULT_FILTERS, filterReviews, hasActiveFilters, sortReviews, type Filters } from "./filterReviews";
import { effectiveRating, isNegative } from "./reviews";

const review = (over: Partial<Review>): Review => ({
  id: 1,
  type: "guest-to-host",
  status: "published",
  rating: 9,
  publicReview: "Lovely flat",
  reviewCategory: [
    { category: "cleanliness", rating: 9 },
    { category: "communication", rating: 9 },
  ],
  submittedAt: "2024-05-10 12:00:00",
  guestName: "Ana",
  listingName: "Baker Street",
  source: "Hostaway",
  ...over,
});

const f = (over: Partial<Filters>): Filters => ({ ...DEFAULT_FILTERS, ...over });
const none = () => false;

describe("effectiveRating", () => {
  it("uses the overall rating when present", () => {
    expect(effectiveRating(review({ rating: 7 }))).toBe(7);
  });

  it("falls back to the category average when the overall rating is missing", () => {
    const r = review({ rating: null, reviewCategory: [{ category: "cleanliness", rating: 10 }, { category: "communication", rating: 7 }] });
    expect(effectiveRating(r)).toBe(8.5);
  });

  it("returns null instead of 0 when there is nothing to rate", () => {
    expect(effectiveRating(review({ rating: null, reviewCategory: [] }))).toBeNull();
  });
});

describe("isNegative", () => {
  it("flags a low category even when the overall rating is fine", () => {
    expect(isNegative(review({ rating: 9, reviewCategory: [{ category: "cleanliness", rating: 6 }] }))).toBe(true);
  });

  it("does not treat a missing rating as negative", () => {
    expect(isNegative(review({ rating: null, reviewCategory: [] }))).toBe(false);
  });
});

describe("filterReviews", () => {
  const dirty = review({ id: 1, rating: 9, reviewCategory: [{ category: "cleanliness", rating: 6 }] });
  const clean = review({ id: 2, rating: 7, reviewCategory: [{ category: "cleanliness", rating: 10 }] });

  it("applies the rating band to the selected category instead of the overall rating", () => {
    const out = filterReviews([dirty, clean], f({ category: "cleanliness", rating: "<8" }), none);
    expect(out.map((r) => r.id)).toEqual([1]);
  });

  it("applies the rating band to the overall rating when no category is selected", () => {
    const out = filterReviews([dirty, clean], f({ rating: "<8" }), none);
    expect(out.map((r) => r.id)).toEqual([2]);
  });

  it("excludes unrated reviews from a rating band rather than counting them as 0", () => {
    const unrated = review({ id: 3, rating: null, reviewCategory: [] });
    expect(filterReviews([unrated], f({ rating: "<8" }), none)).toEqual([]);
  });

  it("treats the date range as inclusive and handles both date formats", () => {
    const a = review({ id: 1, submittedAt: "2024-05-01 23:59:00" });
    const b = review({ id: 2, submittedAt: "2024-05-31T08:00:00Z" });
    const c = review({ id: 3, submittedAt: "2024-06-01 00:00:00" });
    const out = filterReviews([a, b, c], f({ from: "2024-05-01", to: "2024-05-31" }), none);
    expect(out.map((r) => r.id)).toEqual([1, 2]);
  });

  it("filters by website visibility", () => {
    const approved = (id: number) => id === 2;
    expect(filterReviews([dirty, clean], f({ visibility: "public" }), approved).map((r) => r.id)).toEqual([2]);
    expect(filterReviews([dirty, clean], f({ visibility: "hidden" }), approved).map((r) => r.id)).toEqual([1]);
  });

  it("searches guest, listing and review text case-insensitively", () => {
    const r = review({ publicReview: "The Wi-Fi was SLOW" });
    expect(filterReviews([r], f({ query: "wi-fi was slow" }), none)).toHaveLength(1);
    expect(filterReviews([r], f({ query: "baker" }), none)).toHaveLength(1);
    expect(filterReviews([r], f({ query: "parking" }), none)).toHaveLength(0);
  });
});

describe("sortReviews", () => {
  const old = review({ id: 1, rating: 10, submittedAt: "2023-01-01" });
  const mid = review({ id: 2, rating: 6, submittedAt: "2024-01-01" });
  const unrated = review({ id: 3, rating: null, reviewCategory: [], submittedAt: "2025-01-01" });

  it("sorts newest first", () => {
    expect(sortReviews([old, mid, unrated], "newest").map((r) => r.id)).toEqual([3, 2, 1]);
  });

  it("puts unrated reviews last for both rating sorts", () => {
    expect(sortReviews([unrated, old, mid], "highest").map((r) => r.id)).toEqual([1, 2, 3]);
    expect(sortReviews([unrated, old, mid], "lowest").map((r) => r.id)).toEqual([2, 1, 3]);
  });

  it("does not mutate its input", () => {
    const input = [old, mid];
    sortReviews(input, "newest");
    expect(input).toEqual([old, mid]);
  });
});

describe("hasActiveFilters", () => {
  it("ignores the sort order", () => {
    expect(hasActiveFilters(f({ sort: "lowest" }))).toBe(false);
    expect(hasActiveFilters(f({ listing: "Baker Street" }))).toBe(true);
  });
});
