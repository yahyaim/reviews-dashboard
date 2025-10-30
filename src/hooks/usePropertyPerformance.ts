import { useMemo } from "react";
import { Review } from "../types/review";

export type PropertyPerf = {
  property: string;
  count: number;
  avgRating: number;
  positivePct: number; // rating >= 9
  cleanlinessAvg: number | null;
  communicationAvg: number | null;
  houseRulesAvg: number | null;
  topIssue: string | null; // lowest avg category among the three
  recentDelta: number | null; // avg(last third) - avg(previous third)
};

type Agg = {
  ratings: number[];
  cleanliness: number[];
  communication: number[];
  houseRules: number[];
};

const avg = (arr: number[]) =>
  arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : 0;

export function usePropertyPerformance(reviews: Review[]): PropertyPerf[] {
  return useMemo(() => {
    if (!reviews?.length) return [];

    // group by listingName
    const map = new Map<string, Agg & { dates: { d: string; r: number }[] }>();

    for (const r of reviews) {
      const key = r.listingName || "Unknown";
      if (!map.has(key)) {
        map.set(key, {
          ratings: [],
          cleanliness: [],
          communication: [],
          houseRules: [],
          dates: [],
        });
      }
      const g = map.get(key)!;
      if (typeof r.rating === "number") {
        g.ratings.push(r.rating);
        const dateOnly = (r.submittedAt || "").split("T")[0].split(" ")[0] || "1970-01-01";
        g.dates.push({ d: dateOnly, r: r.rating });
      }

      const c = r.reviewCategory ?? [];
      const cl = c.find((x) => x.category === "cleanliness")?.rating;
      const co = c.find((x) => x.category === "communication")?.rating;
      const hr = c.find((x) => x.category === "respect_house_rules")?.rating;
      if (typeof cl === "number") g.cleanliness.push(cl);
      if (typeof co === "number") g.communication.push(co);
      if (typeof hr === "number") g.houseRules.push(hr);
    }

    const out: PropertyPerf[] = [];
    for (const [property, g] of map) {
      // sort by date for a simple recent delta
      const sortedDates = g.dates.sort((a, b) => (a.d < b.d ? -1 : a.d > b.d ? 1 : 0));
      const n = sortedDates.length;
      let recentDelta: number | null = null;
      if (n >= 4) {
        const slice = Math.max(1, Math.floor(n / 3));
        const older = sortedDates.slice(Math.max(0, n - 2 * slice), Math.max(0, n - slice));
        const recent = sortedDates.slice(Math.max(0, n - slice));
        const avgOlder = avg(older.map((x) => x.r));
        const avgRecent = avg(recent.map((x) => x.r));
        recentDelta = Math.round((avgRecent - avgOlder) * 10) / 10;
      }

      const count = g.ratings.length;
      const avgRating = avg(g.ratings);
      const positivePct =
        count === 0 ? 0 : Math.round((g.ratings.filter((v) => v >= 9).length / count) * 100);

      const cleanlinessAvg = g.cleanliness.length ? avg(g.cleanliness) : null;
      const communicationAvg = g.communication.length ? avg(g.communication) : null;
      const houseRulesAvg = g.houseRules.length ? avg(g.houseRules) : null;

      // find weakest category (lowest average) as "top issue"
      const catAverages: [string, number | null][] = [
        ["Cleanliness", cleanlinessAvg],
        ["Communication", communicationAvg],
        ["House Rules", houseRulesAvg],
      ];
      const numericOnly = catAverages.filter(([, v]) => typeof v === "number") as [string, number][];
      const topIssue =
        numericOnly.length === 0
          ? null
          : numericOnly.sort((a, b) => a[1] - b[1])[0][0];

      out.push({
        property,
        count,
        avgRating,
        positivePct,
        cleanlinessAvg,
        communicationAvg,
        houseRulesAvg,
        topIssue,
        recentDelta,
      });
    }

    // default sort: highest avg rating first
    return out.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
  }, [reviews]);
}
