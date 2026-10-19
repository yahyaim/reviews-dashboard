import { useMemo } from "react";
import { Review } from "../types/review";
import { CATEGORIES, categoryScore, effectiveRating, isNegative } from "../lib/reviews";

// very small English stoplist – extend as you like
const STOPWORDS = new Set([
  "the","a","an","and","or","but","if","then","than","so","to","of","in","on","at","for","from","by",
  "with","about","into","over","after","before","between","out","against","during","without","within",
  "is","am","are","was","were","be","been","being","it","its","as","this","that","those","these","we",
  "they","you","i","me","my","our","your","their","them","us","he","she","his","her","him","do","did",
  "does","done","doing","not","no","yes","very","too","also","just","more","most","less","least","there",
  "here","up","down"
]);

type MonthKey = string; // YYYY-MM

const monthKey = (iso?: string) => {
  if (!iso) return "Unknown";
  const d = iso.includes("T") ? iso.split("T")[0] : iso.split(" ")[0];
  const [y, m] = d.split("-");
  return `${y}-${m}`;
};

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const isInformative = (w: string) =>
  !STOPWORDS.has(w) && !(w.length <= 2 && !/^\d+$/.test(w));

const bigrams = (words: string[]) => {
  const res: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    const a = words[i], b = words[i + 1];
    if (isInformative(a) && isInformative(b)) res.push(`${a} ${b}`);
  }
  return res;
};

export type TrendsOutput = {
  series: { month: MonthKey; count: number; avg: number | null }[];
  negativeShare: { month: MonthKey; share: number }[];
  topKeywords: { term: string; count: number }[];
  topBigrams: { term: string; count: number }[];
  categoryDeltas: { key: string; last: number | null; prev: number | null; delta: number | null }[];
  watchlist: { type: "drop" | "spike"; message: string }[];
  listingsWithIssues: { listing: string; negatives: number }[];
};

export function useTrends(reviews: Review[]): TrendsOutput {
  return useMemo(() => {
    // 1) Monthly aggregates
    const monthMap: Record<MonthKey, { sum: number; rated: number; n: number; neg: number }> = {};
    for (const r of reviews) {
      const m = monthKey(r.submittedAt);
      if (!monthMap[m]) monthMap[m] = { sum: 0, rated: 0, n: 0, neg: 0 };
      const rating = effectiveRating(r);
      if (rating !== null) {
        monthMap[m].sum += rating;
        monthMap[m].rated += 1;
      }
      monthMap[m].n += 1;
      if (isNegative(r)) monthMap[m].neg += 1;
    }
    const months = Object.keys(monthMap).filter((m) => m !== "Unknown").sort();
    const series = months.map((m) => ({
      month: m,
      count: monthMap[m].n,
      avg: monthMap[m].rated ? +(monthMap[m].sum / monthMap[m].rated).toFixed(2) : null,
    }));
    const negativeShare = months.map((m) => ({
      month: m,
      share: monthMap[m].n ? +(monthMap[m].neg / monthMap[m].n * 100).toFixed(1) : 0,
    }));

    // 2) Keyword extraction on negative/neutral (<=8.5) reviews
    const wordCounts: Record<string, number> = {};
    const bigramCounts: Record<string, number> = {};

    for (const r of reviews) {
      const text = (r.publicReview || "").trim();
      if (!text) continue;
      const consider = (effectiveRating(r) ?? 10) <= 8.5 || isNegative(r);
      if (!consider) continue;

      const tokens = tokenize(text).filter(isInformative);
      for (const w of tokens) wordCounts[w] = (wordCounts[w] || 0) + 1;
      for (const bg of bigrams(tokens)) bigramCounts[bg] = (bigramCounts[bg] || 0) + 1;
    }

    const toSorted = (obj: Record<string, number>, limit = 15) =>
      Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([term, count]) => ({ term, count }));

    const topKeywords = toSorted(wordCounts, 15);
    const topBigrams = toSorted(bigramCounts, 10);

    // 3) Category deltas (last month vs previous month)
    const catKeys = CATEGORIES.map((c) => c.key);
    const byMonthCat: Record<MonthKey, Record<string, { sum: number; n: number }>> = {};
    for (const r of reviews) {
      const m = monthKey(r.submittedAt);
      byMonthCat[m] ||= {};
      for (const k of catKeys) {
        const val = categoryScore(r, k);
        if (typeof val === "number") {
          byMonthCat[m][k] ||= { sum: 0, n: 0 };
          byMonthCat[m][k].sum += val;
          byMonthCat[m][k].n += 1;
        }
      }
    }
    const last = months[months.length - 1];
    const prev = months[months.length - 2];
    const categoryDeltas = catKeys.map((k) => {
      const lastAvg =
        last && byMonthCat[last]?.[k]?.n
          ? +(byMonthCat[last][k].sum / byMonthCat[last][k].n).toFixed(2)
          : null;
      const prevAvg =
        prev && byMonthCat[prev]?.[k]?.n
          ? +(byMonthCat[prev][k].sum / byMonthCat[prev][k].n).toFixed(2)
          : null;
      const delta =
        lastAvg !== null && prevAvg !== null ? +(lastAvg - prevAvg).toFixed(2) : null;
      return { key: k, last: lastAvg, prev: prevAvg, delta };
    });

    // 4) Simple watchlist rules (spikes/drops)
    const watchlist: { type: "drop" | "spike"; message: string }[] = [];
    if (series.length >= 3) {
      const avgOf = (xs: (number | null)[]) => {
        const nums = xs.filter((x): x is number => x !== null);
        return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null;
      };
      const avgLast3 = avgOf(series.slice(-3).map((s) => s.avg));
      const avgPrev3 = avgOf(series.slice(-6, -3).map((s) => s.avg));
      if (avgLast3 !== null && avgPrev3 !== null) {
        if (avgPrev3 - avgLast3 >= 0.5) {
          watchlist.push({
            type: "drop",
            message: `Average rating dropped ${(avgPrev3 - avgLast3).toFixed(1)} points over the last 3 months with reviews.`,
          });
        }
      }
    }
    if (negativeShare.length >= 2) {
      const [p, c] = negativeShare.slice(-2);
      if (c.share - p.share >= 8) {
        watchlist.push({
          type: "spike",
          message: `Share of negative reviews rose ${Math.round(c.share - p.share)} points in ${c.month} vs ${p.month}.`,
        });
      }
    }

    // 5) Listings with most negatives
    const negPerListing: Record<string, number> = {};
    for (const r of reviews) {
      if (isNegative(r)) {
        const name = r.listingName || "Unknown";
        negPerListing[name] = (negPerListing[name] || 0) + 1;
      }
    }
    const listingsWithIssues = Object.entries(negPerListing)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([listing, negatives]) => ({ listing, negatives }));

    return { series, negativeShare, topKeywords, topBigrams, categoryDeltas, watchlist, listingsWithIssues };
  }, [reviews]);
}
