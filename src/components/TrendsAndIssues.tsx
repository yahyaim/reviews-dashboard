import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Card, CardHeader } from "./ui";
import { Review } from "../types/review";
import { useTrends } from "../hooks/useTrends";
import { categoryLabel } from "../lib/reviews";

const monthLabel = (m?: string) => {
  if (!m) return "";
  const [y, mo] = m.split("-").map(Number);
  return new Date(y, mo - 1, 1).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
};

const Sparkline: React.FC<{ values: number[]; label: string }> = ({ values, label }) => {
  if (values.length < 2) return <div className="flex h-12 items-center text-sm text-brand-muted">Not enough data</div>;
  const w = 180, h = 48, pad = 4;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const step = (w - pad * 2) / (values.length - 1);
  const points = values.map((v, i) => `${pad + i * step},${h - pad - ((v - min) / range) * (h - pad * 2)}`);
  return (
    <svg className="h-12 w-full text-brand-accent" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label={label}>
      <polygon fill="currentColor" opacity="0.08" points={`${pad},${h} ${points.join(" ")} ${w - pad},${h}`} />
      <polyline fill="none" stroke="currentColor" strokeWidth="1.75" vectorEffect="non-scaling-stroke" points={points.join(" ")} />
    </svg>
  );
};

const TrendTile = ({
  title,
  values,
  months,
  format,
}: {
  title: string;
  values: number[];
  months: string[];
  format: (v: number) => string;
}) => (
  <div className="rounded-lg border border-brand-border/70 p-3">
    <div className="mb-1 flex items-baseline justify-between gap-2">
      <span className="text-xs font-medium text-brand-muted">{title}</span>
      {values.length > 0 && (
        <span className="text-sm font-semibold tabular-nums text-brand-text">{format(values[values.length - 1])}</span>
      )}
    </div>
    <Sparkline values={values} label={`${title} by month`} />
    <div className="mt-1 flex justify-between text-[11px] text-brand-muted">
      <span>{monthLabel(months[0])}</span>
      <span>{monthLabel(months[months.length - 1])}</span>
    </div>
  </div>
);

const TermList = ({ title, items, empty }: { title: string; items: { term: string; count: number }[]; empty: string }) => (
  <div className="rounded-lg border border-brand-border/70 p-3">
    <h3 className="mb-2 text-sm font-semibold text-brand-text">{title}</h3>
    {items.length === 0 ? (
      <p className="text-sm text-brand-muted">{empty}</p>
    ) : (
      <div className="flex flex-wrap gap-1.5">
        {items.map((k) => (
          <span key={k.term} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
            {k.term}
            <b className="tabular-nums text-slate-900">{k.count}</b>
          </span>
        ))}
      </div>
    )}
  </div>
);

type Props = { reviews: Review[]; onSelectListing: (listing: string) => void };

export const TrendsAndIssues: React.FC<Props> = ({ reviews, onSelectListing }) => {
  const { series, negativeShare, topKeywords, topBigrams, categoryDeltas, watchlist, listingsWithIssues } =
    useTrends(reviews);

  const rated = series.filter((s): s is typeof s & { avg: number } => s.avg !== null);

  return (
    <Card>
      <CardHeader title="Trends & recurring issues" subtitle="Based on the current filters." />

      {watchlist.length > 0 && (
        <ul className="grid gap-2 px-4 pt-4">
          {watchlist.map((w) => (
            <li
              key={w.message}
              className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${
                w.type === "drop" ? "border-rose-200 bg-rose-50 text-rose-800" : "border-amber-200 bg-amber-50 text-amber-800"
              }`}
            >
              <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {w.message}
            </li>
          ))}
        </ul>
      )}

      <div className="grid gap-3 p-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr]">
        <TrendTile
          title="Average rating"
          values={rated.map((s) => s.avg)}
          months={rated.map((s) => s.month)}
          format={(v) => v.toFixed(1)}
        />
        <TrendTile
          title="Negative reviews"
          values={negativeShare.map((s) => s.share)}
          months={negativeShare.map((s) => s.month)}
          format={(v) => `${Math.round(v)}%`}
        />

        <div className="rounded-lg border border-brand-border/70 p-3 md:col-span-2 lg:col-span-1">
          <p className="mb-2 text-xs font-medium text-brand-muted">Category scores, latest month vs previous</p>
          <table className="w-full text-sm">
            <thead className="text-xs text-brand-muted">
              <tr>
                <th className="pb-1 text-left font-medium">Category</th>
                <th className="pb-1 text-right font-medium">Prev</th>
                <th className="pb-1 text-right font-medium">Latest</th>
                <th className="pb-1 text-right font-medium">Change</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {categoryDeltas.map((c) => (
                <tr key={c.key} className="border-t border-brand-border/40">
                  <td className="py-1 text-slate-700">{categoryLabel(c.key)}</td>
                  <td className="py-1 text-right">{c.prev?.toFixed(1) ?? "—"}</td>
                  <td className="py-1 text-right">{c.last?.toFixed(1) ?? "—"}</td>
                  <td
                    className={`py-1 text-right font-medium ${
                      c.delta === null || c.delta === 0 ? "text-brand-muted" : c.delta < 0 ? "text-rose-700" : "text-emerald-700"
                    }`}
                  >
                    {c.delta === null ? "—" : c.delta > 0 ? `+${c.delta.toFixed(1)}` : c.delta.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-3 px-4 pb-4 md:grid-cols-2 lg:grid-cols-3">
        <TermList title="Recurring words in lower-rated reviews" items={topKeywords} empty="Nothing stands out." />
        <TermList title="Common phrases" items={topBigrams} empty="Nothing stands out." />

        <div className="rounded-lg border border-brand-border/70 p-3 md:col-span-2 lg:col-span-1">
          <h3 className="mb-2 text-sm font-semibold text-brand-text">Listings with most negative reviews</h3>
          {listingsWithIssues.length === 0 ? (
            <p className="text-sm text-brand-muted">No negative reviews in this view.</p>
          ) : (
            <ul className="grid gap-1">
              {listingsWithIssues.map((l) => (
                <li key={l.listing}>
                  <button
                    type="button"
                    onClick={() => onSelectListing(l.listing)}
                    className="flex w-full items-center justify-between gap-2 rounded-md px-1.5 py-1 text-left hover:bg-brand-bg/60"
                  >
                    <span className="truncate text-sm text-brand-text">{l.listing}</span>
                    <span className="rounded-md bg-rose-50 px-2 py-0.5 text-xs font-bold tabular-nums text-rose-800">
                      {l.negatives}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
};
