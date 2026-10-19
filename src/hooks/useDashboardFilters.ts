import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CHANNEL_OPTIONS,
  DEFAULT_FILTERS,
  RATING_OPTIONS,
  SORT_OPTIONS,
  VISIBILITY_OPTIONS,
  type Filters,
} from "../lib/filterReviews";
import { CATEGORIES } from "../lib/reviews";

/** URL param name for each filter, so views are shareable and survive a reload. */
const PARAM: Record<keyof Filters, string> = {
  query: "q",
  channel: "channel",
  rating: "rating",
  category: "category",
  listing: "listing",
  from: "from",
  to: "to",
  visibility: "visibility",
  sort: "sort",
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function oneOf<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return value !== null && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

const date = (v: string | null) => (v && ISO_DATE.test(v) ? v : "");

export function useDashboardFilters() {
  const [params, setParams] = useSearchParams();

  const filters = useMemo<Filters>(
    () => ({
      query: params.get(PARAM.query) ?? "",
      channel: oneOf(params.get(PARAM.channel), CHANNEL_OPTIONS.map((o) => o.value), "All"),
      rating: oneOf(params.get(PARAM.rating), RATING_OPTIONS.map((o) => o.value), "All"),
      category: oneOf(params.get(PARAM.category), ["All", ...CATEGORIES.map((c) => c.key)], "All"),
      listing: params.get(PARAM.listing) || "All",
      from: date(params.get(PARAM.from)),
      to: date(params.get(PARAM.to)),
      visibility: oneOf(params.get(PARAM.visibility), VISIBILITY_OPTIONS.map((o) => o.value), "All"),
      sort: oneOf(params.get(PARAM.sort), SORT_OPTIONS.map((o) => o.value), "newest"),
    }),
    [params]
  );

  // Batch every change into one navigation: separate setParams calls in the same
  // tick would overwrite each other.
  const update = useCallback(
    (patch: Partial<Filters>) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const [key, value] of Object.entries(patch) as [keyof Filters, string][]) {
            if (value === DEFAULT_FILTERS[key] || value === "") next.delete(PARAM[key]);
            else next.set(PARAM[key], value);
          }
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  /** Clears every filter but keeps the chosen sort order. */
  const reset = useCallback(() => update({ ...DEFAULT_FILTERS, sort: filters.sort }), [update, filters.sort]);

  return { filters, update, reset };
}
