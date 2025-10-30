import React from "react";
import { Review } from "../types/review";
import styles from "../styles/Dashboard.module.css";

type Props = {
  reviews: Review[];                 // filtered reviews
  page: number;
  setPage: (n: number) => void;
  publicMap: Record<number, boolean>;
  setPublicMap: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
};

const PAGE_SIZE = 6;

const safeDate = (s?: string) => {
  if (!s) return "";
  return s.includes("T") ? s.split("T")[0] : s.split(" ")[0];
};

export const Reviews: React.FC<Props> = ({
  reviews,
  page, setPage,
  publicMap, setPublicMap
}) => {
  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageRows = reviews.slice(startIdx, endIdx);

  return (
    <>
      {/* Table */}
      <section className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <span>Guest</span>
          <span>Listing</span>
          <span>Rating</span>
          <span>Categories</span>
          <span>Source</span>
          <span>Date</span>
          <span>Show on Website</span>
        </div>

        {pageRows.length === 0 ? (
          <div className={styles.empty}>No reviews match your filters.</div>
        ) : (
          pageRows.map((r) => {
            const twoCats = (r.reviewCategory ?? []).slice(0, 2);
            return (
              <div key={r.id} className={styles.row}>
                <div className={styles.cellStrong}>{r.guestName}</div>
                <div className={styles.cell}>{r.listingName}</div>
                <div className={styles.cell}>{r.rating ?? "-"}</div>
                <div className={styles.cell}>
                  {twoCats.length ? (
                    <div className={styles.chips}>
                      {twoCats.map((c) => (
                        <span key={c.category} className={styles.chip}>
                          <span className={styles.cap}>{c.category.replace(/_/g, " ")}</span>
                          <strong className={styles.score}>{c.rating}/10</strong>
                        </span>
                      ))}
                      {(r.reviewCategory?.length ?? 0) > 2 && (
                        <span className={styles.more}>+{(r.reviewCategory?.length ?? 0) - 2} more</span>
                      )}
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
                <div className={styles.cell}>
                  <span className={styles.source}>{r.source ?? "Hostaway"}</span>
                </div>
                <div className={styles.cell}>{safeDate(r.submittedAt)}</div>
                <div className={styles.cell}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={!!publicMap[r.id]}
                      onChange={(e) =>
                        setPublicMap((m) => ({ ...m, [r.id]: e.target.checked }))
                      }
                    />
                    <span>{publicMap[r.id] ? "Public" : "Hidden"}</span>
                  </label>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Pagination (no page-size selector) */}
      <section className={styles.paginationBar}>
        <div className={styles.pageInfo}>
          {reviews.length === 0
            ? "0–0 of 0"
            : `${startIdx + 1}–${Math.min(endIdx, reviews.length)} of ${reviews.length}`}
        </div>

        <div className={styles.pageControls}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            ‹
          </button>
          <span className={styles.pageNumber}>{currentPage} / {totalPages}</span>
          <button
            className={styles.pageBtn}
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      </section>
    </>
  );
};
