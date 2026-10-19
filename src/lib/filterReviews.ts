import type { Review, ReviewSource } from "../types/review";
import { categoryScore, dateOnly, effectiveRating, type CategoryKey } from "./reviews";

export type Channel = "All" | ReviewSource;
export type RatingBand = "All" | "10" | "8-9" | "<8";
export type Visibility = "All" | "public" | "hidden";
export type SortKey = "newest" | "oldest" | "highest" | "lowest";

export type Filters = {
  query: string;
  channel: Channel;
  rating: RatingBand;
  category: "All" | CategoryKey;
  listing: string;
  from: string;
  to: string;
  visibility: Visibility;
  sort: SortKey;
};

export const DEFAULT_FILTERS: Filters = {
  query: "",
  channel: "All",
  rating: "All",
  category: "All",
  listing: "All",
  from: "",
  to: "",
  visibility: "All",
  sort: "newest",
};

export const CHANNEL_OPTIONS: { value: Channel; label: string }[] = [
  { value: "All", label: "All channels" },
  { value: "Hostaway", label: "Hostaway" },
  { value: "Google", label: "Google" },
];

export const RATING_OPTIONS: { value: RatingBand; label: string }[] = [
  { value: "All", label: "Any rating" },
  { value: "10", label: "10 · Perfect" },
  { value: "8-9", label: "8–9.9 · Good" },
  { value: "<8", label: "Below 8 · Needs attention" },
];

export const VISIBILITY_OPTIONS: { value: Visibility; label: string }[] = [
  { value: "All", label: "All" },
  { value: "public", label: "On website" },
  { value: "hidden", label: "Hidden" },
];

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "highest", label: "Highest rated" },
  { value: "lowest", label: "Lowest rated" },
];

/** True when anything other than the sort order differs from the defaults. */
export const hasActiveFilters = (f: Filters) =>
  (Object.keys(DEFAULT_FILTERS) as (keyof Filters)[]).some((k) => k !== "sort" && f[k] !== DEFAULT_FILTERS[k]);

const inBand = (v: number | null, band: RatingBand) => {
  if (band === "All") return true;
  if (v === null) return false;
  if (band === "10") return v >= 10;
  if (band === "8-9") return v >= 8 && v < 10;
  return v < 8;
};

/**
 * Applies every dashboard filter. When a category is selected, the rating band
 * applies to that category's score ("cleanliness below 8"); otherwise to the
 * overall rating. Reviews without the selected category are excluded.
 */
export function filterReviews(
  reviews: Review[],
  f: Filters,
  isApproved: (id: Review["id"]) => boolean
): Review[] {
  const q = f.query.trim().toLowerCase();
  return reviews.filter((r) => {
    if (f.channel !== "All" && (r.source ?? "Hostaway") !== f.channel) return false;
    if (f.listing !== "All" && r.listingName !== f.listing) return false;
    if (f.visibility !== "All" && isApproved(r.id) !== (f.visibility === "public")) return false;

    if (f.from || f.to) {
      const d = dateOnly(r.submittedAt);
      if (!d) return false;
      if (f.from && d < f.from) return false;
      if (f.to && d > f.to) return false;
    }

    if (f.category !== "All") {
      const score = categoryScore(r, f.category);
      if (score === undefined || !inBand(score, f.rating)) return false;
    } else if (!inBand(effectiveRating(r), f.rating)) {
      return false;
    }

    if (q) {
      const hay = `${r.guestName} ${r.listingName} ${r.publicReview}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function sortReviews(reviews: Review[], sort: SortKey): Review[] {
  const byDate = (a: Review, b: Review) => (a.submittedAt ?? "").localeCompare(b.submittedAt ?? "");
  // Unrated reviews sink to the bottom for both rating sorts.
  const rating = (r: Review, missing: number) => effectiveRating(r) ?? missing;
  const sorted = [...reviews];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => byDate(b, a));
    case "oldest":
      return sorted.sort(byDate);
    case "highest":
      return sorted.sort((a, b) => rating(b, -1) - rating(a, -1) || byDate(b, a));
    case "lowest":
      return sorted.sort((a, b) => rating(a, 11) - rating(b, 11) || byDate(b, a));
  }
}
