import React, { useMemo, useState } from "react";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Badge, Card, CardHeader, Input, Pagination, ScoreBadge } from "./ui";
import type { PropertyPerf } from "../hooks/usePropertyPerformance";
import { formatScore } from "../lib/reviews";

type SortKey = Exclude<keyof PropertyPerf, "topIssue">;

type Props = {
  data: PropertyPerf[];
  /** Called when a row is chosen, to drill into that listing's reviews. */
  onSelect: (property: string) => void;
};

const PAGE_SIZE = 8;

const COLUMNS: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: "property", label: "Property" },
  { key: "avgRating", label: "Avg rating", numeric: true },
  { key: "count", label: "Reviews", numeric: true },
  { key: "positivePct", label: "Positive", numeric: true },
  { key: "cleanlinessAvg", label: "Cleanliness", numeric: true },
  { key: "communicationAvg", label: "Communication", numeric: true },
  { key: "houseRulesAvg", label: "House rules", numeric: true },
  { key: "recentDelta", label: "Recent trend", numeric: true },
];

const Delta = ({ v }: { v: number | null }) => {
  if (v === null) return <span className="text-xs text-brand-muted" title="Needs at least 4 rated reviews">—</span>;
  if (v === 0) return <span className="text-xs text-brand-muted">No change</span>;
  const up = v > 0;
  const Icon = up ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
  return (
    <Badge className={up ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}>
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {up ? "+" : "−"}
      {Math.abs(v).toFixed(1)}
    </Badge>
  );
};

export const PropertyPerformance: React.FC<Props> = ({ data, onSelect }) => {
  const [sortKey, setSortKey] = useState<SortKey>("avgRating");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = needle ? data.filter((d) => d.property.toLowerCase().includes(needle)) : data;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      // Empty values always sort last.
      if (av === null) return bv === null ? 0 : 1;
      if (bv === null) return -1;
      if (typeof av === "string" && typeof bv === "string") return av.localeCompare(bv) * dir;
      return ((av as number) - (bv as number)) * dir;
    });
  }, [q, data, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir(k === "property" ? "asc" : "desc");
    }
    setPage(1);
  };

  return (
    <Card>
      <CardHeader title="Property performance" subtitle="Select a property to see its reviews.">
        <div className="relative w-full sm:w-64">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
          <Input
            type="search"
            aria-label="Search properties"
            placeholder="Search properties"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
      </CardHeader>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead className="bg-brand-bg/50 text-left text-xs text-brand-muted">
            <tr>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={sortKey === c.key ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                  className={`px-4 py-2.5 font-semibold ${c.numeric ? "text-right" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(c.key)}
                    className={`inline-flex items-center gap-1 hover:text-brand-text ${sortKey === c.key ? "text-brand-text" : ""}`}
                  >
                    {c.label}
                    <span aria-hidden className="w-2 text-[10px]">
                      {sortKey === c.key ? (sortDir === "asc" ? "▲" : "▼") : ""}
                    </span>
                  </button>
                </th>
              ))}
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Weakest area
              </th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length + 1} className="px-4 py-8 text-center text-brand-muted">
                  No properties match.
                </td>
              </tr>
            ) : (
              pageRows.map((p) => (
                <tr
                  key={p.property}
                  onClick={() => onSelect(p.property)}
                  className="cursor-pointer border-t border-brand-border/50 hover:bg-brand-bg/40"
                >
                  <th scope="row" className="px-4 py-2.5 text-left font-medium text-brand-text">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(p.property);
                      }}
                      className="text-left hover:text-brand-accent hover:underline"
                    >
                      {p.property}
                    </button>
                  </th>
                  <td className="px-4 py-2.5 text-right">
                    <ScoreBadge value={p.avgRating} average />
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{p.count}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{p.positivePct == null ? "—" : `${p.positivePct}%`}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{formatScore(p.cleanlinessAvg)}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{formatScore(p.communicationAvg)}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{formatScore(p.houseRulesAvg)}</td>
                  <td className="px-4 py-2.5 text-right">
                    <Delta v={p.recentDelta} />
                  </td>
                  <td className="px-4 py-2.5">
                    {p.topIssue ? <Badge className="bg-slate-100 text-slate-700">{p.topIssue}</Badge> : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-brand-border/60">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          total={rows.length}
          pageSize={PAGE_SIZE}
          onChange={setPage}
          noun="properties"
        />
      </div>
    </Card>
  );
};
