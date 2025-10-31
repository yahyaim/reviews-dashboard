import React from "react";
import { Card, Container } from "./ui";
import { Review } from "../types/review";

type Props = {
  reviews: Review[];
  page: number;
  setPage: (n: number) => void;
  publicMap: Record<number, boolean>;
  setPublicMap: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
};

const PAGE_SIZE = 6;
const safeDate = (s?: string) => (s ? (s.includes("T") ? s.split("T")[0] : s.split(" ")[0]) : "");

export const Reviews: React.FC<Props> = ({ reviews, page, setPage, publicMap, setPublicMap }) => {
  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageRows = reviews.slice(startIdx, endIdx);

  return (
    <Container className="mt-4">
      <Card>
        <div className="grid grid-cols-[1.1fr_1.4fr_.6fr_1.3fr_.8fr_.8fr_1.1fr] items-center gap-3 border-b border-brand-border bg-[#fbfaf6] p-3 text-xs font-semibold text-brand-muted">
          <span>Guest</span>
          <span>Listing</span>
          <span>Rating</span>
          <span>Categories</span>
          <span>Source</span>
          <span>Date</span>
          <span>Show on Website</span>
        </div>

        {pageRows.length === 0 ? (
          <div className="p-6 text-center text-sm text-brand-muted">No reviews match your filters.</div>
        ) : (
          pageRows.map((r) => {
            const twoCats = (r.reviewCategory ?? []).slice(0, 2);
            return (
              <div key={r.id} className="grid grid-cols-[1.1fr_1.4fr_.6fr_1.3fr_.8fr_.8fr_1.1fr] items-center gap-3 border-t border-[#eee6d6] p-3 hover:bg-[#faf6ee]">
                <div className="text-sm font-semibold text-brand-text">{r.guestName}</div>
                <div className="text-sm">{r.listingName}</div>
                <div className="text-sm">{r.rating ?? "-"}</div>
                <div className="text-sm">
                  {twoCats.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {twoCats.map((c) => (
                        <span key={c.category} className="inline-flex items-center gap-1 rounded-full border border-brand-border bg-[#f2ede1] px-2 py-1 text-xs">
                          <span className="capitalize text-slate-700">{c.category.replace(/_/g, " ")}</span>
                          <strong className="text-brand-accent">{c.rating}/10</strong>
                        </span>
                      ))}
                      {(r.reviewCategory?.length ?? 0) > 2 && (
                        <span className="text-xs text-brand-muted">+{(r.reviewCategory?.length ?? 0) - 2} more</span>
                      )}
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="text-sm">
                  <span className="inline-block rounded-full border border-[#d6e3e2] bg-[#e8f0ef] px-2 py-1 text-xs text-brand-accent">
                    {r.source ?? "Hostaway"}
                  </span>
                </div>
                <div className="text-sm">{safeDate(r.submittedAt)}</div>
                <div className="text-sm">
                  <label className="inline-flex select-none items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-brand-accent"
                      checked={!!publicMap[r.id]}
                      onChange={(e) => setPublicMap((m) => ({ ...m, [r.id]: e.target.checked }))}
                    />
                    <span>{publicMap[r.id] ? "Public" : "Hidden"}</span>
                  </label>
                </div>
              </div>
            );
          })
        )}

        {/* Pagination */}
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-4">
          <div className="text-sm text-brand-muted">
            {reviews.length === 0 ? "0–0 of 0" : `${startIdx + 1}–${Math.min(endIdx, reviews.length)} of ${reviews.length}`}
          </div>
          <div className="justify-self-end">
            <div className="inline-flex items-center gap-2">
              <button
                className="h-9 rounded-lg border border-brand-border bg-white px-3 text-sm disabled:opacity-50"
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                aria-label="Previous page"
              >
                ‹
              </button>
              <span className="text-sm text-brand-accent">{currentPage} / {totalPages}</span>
              <button
                className="h-9 rounded-lg border border-brand-border bg-white px-3 text-sm disabled:opacity-50"
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};
