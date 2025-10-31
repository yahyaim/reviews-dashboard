import React, { useEffect, useMemo, useState } from "react";
import { Card, Container, Input } from "./ui";
import type { PropertyPerf } from "../hooks/usePropertyPerformance";

type SortKey =
  | "property"
  | "avgRating"
  | "count"
  | "positivePct"
  | "cleanlinessAvg"
  | "communicationAvg"
  | "houseRulesAvg"
  | "recentDelta";

type Props = { data: PropertyPerf[] };
const PAGE_SIZE = 6;

export const PropertyPerformance: React.FC<Props> = ({ data }) => {
  const [sortKey, setSortKey] = useState<SortKey>("avgRating");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => { setPage(1); }, [q, sortKey, sortDir, data]);

  const filteredSorted = useMemo(() => {
    const filtered = q ? data.filter(d => d.property.toLowerCase().includes(q.toLowerCase())) : data;
    const sorted = [...filtered].sort((a, b) => {
      const av = (a as any)[sortKey] ?? 0;
      const bv = (b as any)[sortKey] ?? 0;
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [q, data, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageRows = filteredSorted.slice(start, end);

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) setSortDir(d => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(k); setSortDir(k === "property" ? "asc" : "desc"); }
  };

  const Th = (label: string, key: SortKey) => (
    <button
      type="button"
      onClick={() => toggleSort(key)}
      className={`inline-flex items-center gap-1 text-xs font-semibold text-slate-700 ${sortKey === key ? "text-slate-900" : ""}`}
      title={`Sort by ${label}`}
    >
      {label}
      {sortKey === key && <span className="text-[11px] text-slate-500">{sortDir === "asc" ? "↑" : "↓"}</span>}
    </button>
  );

  const fmt = (v: number | null | undefined) => (v == null ? "—" : v.toFixed(1));

  const Delta = ({ v }: { v: number | null }) =>
    v === null ? (
      <span className="text-xs text-slate-500">—</span>
    ) : v >= 0 ? (
      <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">▲ {v.toFixed(1)}</span>
    ) : (
      <span className="inline-block rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-800">▼ {Math.abs(v).toFixed(1)}</span>
    );

  return (
    <Container className="mt-5">
      <Card>
        <div className="flex items-center justify-between gap-3 border-b border-brand-border bg-[#fafafa] p-4">
          <h2 className="text-base font-bold text-brand-text">Property Performance</h2>
          <div className="relative w-full max-w-xs">
            <Input
              placeholder="Search properties…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pr-8"
            />
            {q && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-muted"
                onClick={() => setQ("")}
                aria-label="Clear search"
                type="button"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="block">
          <div className="grid grid-cols-[1.6fr_.8fr_.7fr_.9fr_1fr_1fr_1fr_.9fr_1fr] items-center gap-3 border-b border-brand-border/60 bg-slate-50 p-3 text-slate-600">
            {Th("Property", "property")}
            {Th("Avg Rating", "avgRating")}
            {Th("Reviews", "count")}
            {Th("Positive %", "positivePct")}
            {Th("Cleanliness", "cleanlinessAvg")}
            {Th("Communication", "communicationAvg")}
            {Th("House Rules", "houseRulesAvg")}
            {Th("Recent Δ", "recentDelta")}
            <div className="text-xs font-semibold text-slate-600">Top Issue</div>
          </div>

          {pageRows.length === 0 ? (
            <div className="p-6 text-center text-sm text-brand-muted">No properties match.</div>
          ) : (
            pageRows.map((p) => (
              <div key={p.property} className="grid grid-cols-[1.6fr_.8fr_.7fr_.9fr_1fr_1fr_1fr_.9fr_1fr] items-center gap-3 border-t border-[#f1f5f9] p-3 hover:bg-[#fafafa]">
                <div className="text-sm font-semibold text-brand-text">{p.property}</div>
                <div className="text-sm">{fmt(p.avgRating)}</div>
                <div className="text-sm">{p.count}</div>
                <div className="text-sm">{p.positivePct}%</div>
                <div className="text-sm">{fmt(p.cleanlinessAvg)}</div>
                <div className="text-sm">{fmt(p.communicationAvg)}</div>
                <div className="text-sm">{fmt(p.houseRulesAvg)}</div>
                <div className="text-sm"><Delta v={p.recentDelta} /></div>
                <div className="flex items-center">
                  {p.topIssue ? (
                    <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-800">
                      {p.topIssue}
                    </span>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-4">
          <div className="text-sm text-slate-500">
            {filteredSorted.length === 0
              ? "0–0 of 0"
              : `${start + 1}–${Math.min(end, filteredSorted.length)} of ${filteredSorted.length}`}
          </div>
          <div className="inline-flex items-center gap-2">
            <button
              className="h-9 rounded-lg border border-brand-border bg-white px-3 text-sm disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              aria-label="Previous page"
              type="button"
            >
              ‹
            </button>
            <span className="text-sm text-brand-accent">
              {currentPage} / {totalPages}
            </span>
            <button
              className="h-9 rounded-lg border border-brand-border bg-white px-3 text-sm disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
              type="button"
            >
              ›
            </button>
          </div>
        </div>
      </Card>
    </Container>
  );
};
