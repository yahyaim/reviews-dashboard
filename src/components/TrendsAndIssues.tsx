import React from "react";
import { Card, Container } from "./ui";
import { Review } from "../types/review";
import { useTrends } from "../hooks/useTrends";

const Sparkline: React.FC<{ values: number[] }> = ({ values }) => {
  if (!values.length) return <div className="text-sm text-slate-500">—</div>;
  const w = 180, h = 48, pad = 4;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const step = (w - pad * 2) / Math.max(1, values.length - 1);
  const points = values.map((v, i) => {
    const x = pad + i * step;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg className="h-12 w-full text-slate-900" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={points} />
    </svg>
  );
};

type Props = { reviews: Review[] };

export const TrendsAndIssues: React.FC<Props> = ({ reviews }) => {
  const { series, negativeShare, topKeywords, topBigrams, categoryDeltas, watchlist, listingsWithIssues } =
    useTrends(reviews);

  const avgSeries = series.map((s) => s.avg);
  const negSeries = negativeShare.map((s) => s.share);

  return (
    <Container className="mt-5">
      <Card>
        <header className="flex items-baseline justify-between gap-3 border-b border-brand-border bg-[#fafafa] p-4">
          <h2 className="text-base font-bold text-brand-text">Trends & Recurring Issues</h2>
          <p className="text-sm text-brand-muted">Based on the current filters</p>
        </header>

        {/* Alerts */}
        {watchlist.length > 0 && (
          <div className="grid gap-2 p-4 pt-3">
            {watchlist.map((w, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${
                  w.type === "drop"
                    ? "border-rose-200 bg-rose-50 text-rose-800"
                    : "border-amber-200 bg-amber-50 text-amber-800"
                }`}
              >
                <span className="text-xs">●</span>
                {w.message}
              </div>
            ))}
          </div>
        )}

        {/* KPIs */}
        <div className="grid gap-3 p-4 lg:grid-cols-[220px_220px_1fr]">
          <Card className="p-3">
            <div className="mb-1 text-xs text-brand-muted">Avg rating (trend)</div>
            <Sparkline values={avgSeries} />
            <div className="mt-1 text-xs text-brand-muted">
              {series.length ? `${series[0].month} → ${series[series.length - 1].month}` : "—"}
            </div>
          </Card>

          <Card className="p-3">
            <div className="mb-1 text-xs text-brand-muted">Negative share %</div>
            <Sparkline values={negSeries} />
            <div className="mt-1 text-xs text-brand-muted">
              {negativeShare.length ? `${negativeShare[0].month} → ${negativeShare[negativeShare.length - 1].month}` : "—"}
            </div>
          </Card>

          <Card className="p-3">
            <div className="mb-2 text-xs text-brand-muted">Category Δ (last vs prev month)</div>
            <div className="grid gap-1">
              <div className="grid grid-cols-[1.2fr_.6fr_.6fr_.4fr] items-center gap-2 border-b border-dashed border-brand-border pb-1 text-xs font-semibold text-slate-600">
                <span>Category</span><span>Prev</span><span>Last</span><span>Δ</span>
              </div>
              {categoryDeltas.map((c) => (
                <div key={c.key} className="grid grid-cols-[1.2fr_.6fr_.6fr_.4fr] items-center gap-2 text-sm">
                  <span className="capitalize text-slate-700">{c.key.replace(/_/g," ")}</span>
                  <span>{c.prev ?? "—"}</span>
                  <span>{c.last ?? "—"}</span>
                  <span className={`${c.delta !== null && c.delta < 0 ? "text-rose-800" : "text-emerald-800"}`}>
                    {c.delta !== null ? (c.delta > 0 ? `+${c.delta}` : `${c.delta}`) : "—"}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Issues grid */}
        <div className="grid gap-3 p-4 lg:grid-cols-3">
          <Card className="p-3">
            <div className="mb-2 text-sm font-bold text-brand-text">Recurring keywords (neg./neutral)</div>
            <div className="flex flex-wrap gap-2">
              {topKeywords.length === 0 ? (
                <span className="text-sm text-brand-muted">No data</span>
              ) : (
                topKeywords.map(k => (
                  <span key={k.term} className="inline-flex items-center gap-1 rounded-full border border-brand-border bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    <span>{k.term}</span>
                    <b className="text-slate-900">{k.count}</b>
                  </span>
                ))
              )}
            </div>
          </Card>

          <Card className="p-3">
            <div className="mb-2 text-sm font-bold text-brand-text">Common 2-word phrases</div>
            <div className="flex flex-wrap gap-2">
              {topBigrams.length === 0 ? (
                <span className="text-sm text-brand-muted">No data</span>
              ) : (
                topBigrams.map(k => (
                  <span key={k.term} className="inline-flex items-center gap-1 rounded-full border border-brand-border bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    <span>{k.term}</span>
                    <b className="text-slate-900">{k.count}</b>
                  </span>
                ))
              )}
            </div>
          </Card>

          <Card className="p-3">
            <div className="mb-2 text-sm font-bold text-brand-text">Listings with most negatives</div>
            <ul className="grid gap-2">
              {listingsWithIssues.length === 0 ? (
                <li className="text-sm text-brand-muted">No negatives found</li>
              ) : (
                listingsWithIssues.map((l) => (
                  <li key={l.listing} className="flex items-center justify-between">
                    <span className="max-w-[70%] truncate text-sm text-brand-text">{l.listing}</span>
                    <span className="rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-800">
                      {l.negatives}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </Card>
        </div>
      </Card>
    </Container>
  );
};
