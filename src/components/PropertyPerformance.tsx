import React, { useMemo, useState, useEffect } from "react";
import { PropertyPerf } from "../hooks/usePropertyPerformance";
import styles from "../styles/PropertyPerformance.module.css";

type SortKey =
  | "property"
  | "avgRating"
  | "count"
  | "positivePct"
  | "cleanlinessAvg"
  | "communicationAvg"
  | "houseRulesAvg"
  | "recentDelta";

type Props = {
  data: PropertyPerf[];
};

const PAGE_SIZE = 6;

export const PropertyPerformance: React.FC<Props> = ({ data }) => {
  const [sortKey, setSortKey] = useState<SortKey>("avgRating");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever data/search/sort changes
  useEffect(() => {
    setPage(1);
  }, [q, sortKey, sortDir, data]);

  const filteredSorted = useMemo(() => {
    const filtered = q
      ? data.filter((d) => d.property.toLowerCase().includes(q.toLowerCase()))
      : data;

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
    if (k === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir(k === "property" ? "asc" : "desc");
    }
  };

  const Th = (label: string, key: SortKey) => (
    <button
      className={`${styles.th} ${sortKey === key ? styles.active : ""}`}
      onClick={() => toggleSort(key)}
      title={`Sort by ${label}`}
      type="button"
    >
      {label}
      {sortKey === key && <span className={styles.sortDir}>{sortDir === "asc" ? "↑" : "↓"}</span>}
    </button>
  );

  const fmt = (v: number | null | undefined) =>
    v === null || v === undefined ? "—" : typeof v === "number" ? v.toFixed(1) : String(v);

  const Delta = ({ v }: { v: number | null }) =>
    v === null ? (
      <span className={styles.deltaNeutral}>—</span>
    ) : v >= 0 ? (
      <span className={styles.deltaPos}>▲ {v.toFixed(1)}</span>
    ) : (
      <span className={styles.deltaNeg}>▼ {Math.abs(v).toFixed(1)}</span>
    );

  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.title}>Property Performance</h2>
        <div className={styles.search}>
          <input
            placeholder="Search properties…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q && (
            <button
              className={styles.searchClear}
              onClick={() => setQ("")}
              aria-label="Clear search"
              type="button"
            >
              ×
            </button>
          )}
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.thead}>
          {Th("Property", "property")}
          {Th("Avg Rating", "avgRating")}
          {Th("Reviews", "count")}
          {Th("Positive %", "positivePct")}
          {Th("Cleanliness", "cleanlinessAvg")}
          {Th("Communication", "communicationAvg")}
          {Th("House Rules", "houseRulesAvg")}
          {Th("Recent Δ", "recentDelta")}
          <div className={styles.thStatic}>Top Issue</div>
        </div>

        {pageRows.length === 0 ? (
          <div className={styles.empty}>No properties match.</div>
        ) : (
          pageRows.map((p) => (
            <div key={p.property} className={styles.row}>
              <div className={styles.cellStrong}>{p.property}</div>
              <div className={styles.cell}>{fmt(p.avgRating)}</div>
              <div className={styles.cell}>{p.count}</div>
              <div className={styles.cell}>{p.positivePct}%</div>
              <div className={styles.cell}>{fmt(p.cleanlinessAvg)}</div>
              <div className={styles.cell}>{fmt(p.communicationAvg)}</div>
              <div className={styles.cell}>{fmt(p.houseRulesAvg)}</div>
              <div className={styles.cell}>
                <Delta v={p.recentDelta} />
              </div>
              <div className={styles.issue}>
                {p.topIssue ? <span className={styles.issuePill}>{p.topIssue}</span> : "—"}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination (fixed 6 per page) */}
      <div className={styles.paginationBar}>
        <div className={styles.pageInfo}>
          {filteredSorted.length === 0
            ? "0–0 of 0"
            : `${start + 1}–${Math.min(end, filteredSorted.length)} of ${filteredSorted.length}`}
        </div>
        <div className={styles.pageControls}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            type="button"
          >
            ‹
          </button>
          <span className={styles.pageNumber}>
            {currentPage} / {totalPages}
          </span>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
            type="button"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};
