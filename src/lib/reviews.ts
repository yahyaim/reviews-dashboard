import type { Review } from "../types/review";

export type CategoryKey = "cleanliness" | "communication" | "respect_house_rules";

export const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "cleanliness", label: "Cleanliness" },
  { key: "communication", label: "Communication" },
  { key: "respect_house_rules", label: "House rules" },
];

/** Scores at or above this count as "positive". */
export const POSITIVE_THRESHOLD = 9;
/** Scores below this count as "negative". */
export const NEGATIVE_THRESHOLD = 8;

export const categoryLabel = (key: string) =>
  CATEGORIES.find((c) => c.key === key)?.label ?? key.replace(/_/g, " ");

export const mean = (xs: number[]): number | null =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;

export const round1 = (n: number) => Math.round(n * 10) / 10;

/** "2024-03-18 10:00:00" or ISO → "2024-03-18". */
export const dateOnly = (s?: string) => (s ? s.split(/[T ]/)[0] : "");

export const categoryScore = (r: Review, key: string): number | undefined => {
  const v = r.reviewCategory?.find((c) => c.category === key)?.rating;
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
};

/**
 * Overall rating, falling back to the category average when the channel only
 * sends category scores. Returns null when there is nothing to go on, so callers
 * can leave the review out of averages instead of counting it as 0.
 */
export function effectiveRating(r: Review): number | null {
  if (typeof r.rating === "number" && Number.isFinite(r.rating)) return r.rating;
  const scores = (r.reviewCategory ?? []).map((c) => c.rating).filter(Number.isFinite);
  const avg = mean(scores);
  return avg === null ? null : round1(avg);
}

export const isNegative = (r: Review) => {
  const rating = effectiveRating(r);
  return (
    (rating !== null && rating < NEGATIVE_THRESHOLD) ||
    (r.reviewCategory ?? []).some((c) => c.rating < NEGATIVE_THRESHOLD)
  );
};

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function formatDate(s?: string) {
  const d = dateOnly(s);
  if (!d) return "—";
  const t = new Date(`${d}T00:00:00`);
  return Number.isNaN(t.getTime()) ? d : dateFmt.format(t);
}

export const formatScore = (v: number | null | undefined) => (v == null ? "—" : v.toFixed(1));

/** Tailwind classes for a score badge: green when positive, red when negative. */
export function scoreTone(v: number | null | undefined) {
  if (v == null) return "bg-slate-100 text-slate-500";
  if (v >= POSITIVE_THRESHOLD) return "bg-emerald-50 text-emerald-800 ring-emerald-200";
  if (v >= NEGATIVE_THRESHOLD) return "bg-amber-50 text-amber-800 ring-amber-200";
  return "bg-rose-50 text-rose-800 ring-rose-200";
}
