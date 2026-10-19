import { useMemo } from "react";
import { Review } from "../types/review";
import { CATEGORIES, POSITIVE_THRESHOLD, categoryScore, dateOnly, effectiveRating, mean, round1 } from "../lib/reviews";

export type PropertyPerf = {
  property: string;
  count: number;
  avgRating: number | null;
  positivePct: number | null; // share of rated reviews >= POSITIVE_THRESHOLD
  cleanlinessAvg: number | null;
  communicationAvg: number | null;
  houseRulesAvg: number | null;
  topIssue: string | null; // lowest-scoring category
  recentDelta: number | null; // avg(most recent third) - avg(previous third)
};

const avg1 = (xs: number[]) => {
  const m = mean(xs);
  return m === null ? null : round1(m);
};

export function usePropertyPerformance(reviews: Review[]): PropertyPerf[] {
  return useMemo(() => {
    const groups = new Map<string, Review[]>();
    for (const r of reviews) {
      const key = r.listingName || "Unknown";
      const g = groups.get(key);
      if (g) g.push(r);
      else groups.set(key, [r]);
    }

    const out: PropertyPerf[] = [];
    for (const [property, items] of groups) {
      const rated = items
        .map((r) => ({ d: dateOnly(r.submittedAt), v: effectiveRating(r) }))
        .filter((x): x is { d: string; v: number } => x.v !== null)
        .sort((a, b) => a.d.localeCompare(b.d));
      const ratings = rated.map((x) => x.v);

      let recentDelta: number | null = null;
      const n = rated.length;
      if (n >= 4) {
        const slice = Math.floor(n / 3);
        const older = avg1(ratings.slice(n - 2 * slice, n - slice));
        const recent = avg1(ratings.slice(n - slice));
        if (older !== null && recent !== null) recentDelta = round1(recent - older);
      }

      const catAvg = (key: string) =>
        avg1(items.map((r) => categoryScore(r, key)).filter((v): v is number => v !== undefined));
      const [cleanlinessAvg, communicationAvg, houseRulesAvg] = CATEGORIES.map((c) => catAvg(c.key));

      const weakest = CATEGORIES.map((c, i) => ({ label: c.label, v: [cleanlinessAvg, communicationAvg, houseRulesAvg][i] }))
        .filter((c): c is { label: string; v: number } => c.v !== null)
        .sort((a, b) => a.v - b.v)[0];

      out.push({
        property,
        count: items.length,
        avgRating: avg1(ratings),
        positivePct: n ? Math.round((ratings.filter((v) => v >= POSITIVE_THRESHOLD).length / n) * 100) : null,
        cleanlinessAvg,
        communicationAvg,
        houseRulesAvg,
        topIssue: weakest?.label ?? null,
        recentDelta,
      });
    }

    return out.sort((a, b) => (b.avgRating ?? -1) - (a.avgRating ?? -1));
  }, [reviews]);
}
