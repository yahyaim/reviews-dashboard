import React, { useState } from "react";
import { Card, CardHeader, Badge, Button, Pagination, ScoreBadge, Select, Toggle } from "./ui";
import { Review } from "../types/review";
import { SORT_OPTIONS, type SortKey } from "../lib/filterReviews";
import { categoryLabel, effectiveRating, formatDate, scoreTone } from "../lib/reviews";

type Props = {
  /** Already filtered and sorted. */
  reviews: Review[];
  page: number;
  pageSize: number;
  setPage: (n: number) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
  isApproved: (id: Review["id"]) => boolean;
  setApproved: (ids: Review["id"][], value: boolean) => void;
};

const ReviewText = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  if (!text) return <p className="text-sm italic text-brand-muted">No written review.</p>;
  const long = text.length > 180;
  return (
    <p className="text-sm leading-relaxed text-slate-700">
      <span className={!open && long ? "line-clamp-2" : undefined}>{text}</span>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-0.5 text-xs font-medium text-brand-accent hover:underline"
        >
          {open ? "Show less" : "Show more"}
        </button>
      )}
    </p>
  );
};

export const Reviews: React.FC<Props> = ({
  reviews,
  page,
  pageSize,
  setPage,
  sort,
  setSort,
  isApproved,
  setApproved,
}) => {
  const totalPages = Math.max(1, Math.ceil(reviews.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = reviews.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pageIds = pageRows.map((r) => r.id);
  const approvedOnPage = pageIds.filter(isApproved).length;

  return (
    <Card id="reviews" className="scroll-mt-20">
      <CardHeader
        title="Reviews"
        subtitle="Choose which reviews appear on the public website. Reviews stay hidden until you approve them."
      >
        <label htmlFor="r-sort" className="sr-only">
          Sort reviews
        </label>
        <Select id="r-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="w-40">
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </CardHeader>

      {pageRows.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-border/60 bg-brand-bg/40 px-4 py-2 text-xs text-brand-muted">
          <span>
            {approvedOnPage} of {pageRows.length} on this page shown on website
          </span>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={() => setApproved(pageIds, true)} disabled={approvedOnPage === pageRows.length}>
              Show all on page
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setApproved(pageIds, false)} disabled={approvedOnPage === 0}>
              Hide all on page
            </Button>
          </div>
        </div>
      )}

      {pageRows.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <p className="font-medium text-brand-text">No reviews match your filters</p>
          <p className="mt-1 text-sm text-brand-muted">Try widening the date range or clearing a filter.</p>
        </div>
      ) : (
        <ul className="divide-y divide-brand-border/50">
          {pageRows.map((r) => {
            const approved = isApproved(r.id);
            return (
              <li key={r.id} className="flex gap-3 px-4 py-4 sm:gap-4">
                <ScoreBadge value={effectiveRating(r)} className="mt-0.5 h-8 shrink-0" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-semibold text-brand-text">{r.guestName || "Guest"}</span>
                    <span className="truncate text-sm text-brand-muted">{r.listingName}</span>
                  </div>
                  <p className="mb-1.5 text-xs text-brand-muted">
                    {formatDate(r.submittedAt)} · {r.source ?? "Hostaway"}
                  </p>

                  <ReviewText text={r.publicReview} />

                  {r.reviewCategory?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {r.reviewCategory.map((c) => (
                        <Badge key={c.category} className={`ring-1 ring-inset ${scoreTone(c.rating)}`}>
                          {categoryLabel(c.category)}
                          <b className="tabular-nums">{c.rating}</b>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5">
                  <Toggle
                    checked={approved}
                    onChange={(v) => setApproved([r.id], v)}
                    label={`Show review by ${r.guestName || "guest"} on website`}
                  />
                  <span className={`text-xs ${approved ? "font-medium text-brand-accent" : "text-brand-muted"}`}>
                    {approved ? "On website" : "Hidden"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="border-t border-brand-border/60">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          total={reviews.length}
          pageSize={pageSize}
          onChange={setPage}
          noun="reviews"
        />
      </div>
    </Card>
  );
};
