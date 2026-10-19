import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowDownTrayIcon, ArrowPathIcon, ChevronDownIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import { Review } from "../types/review";
import { useReviews } from "../hooks/useReviews";
import { useApprovals } from "../hooks/useApprovals";
import { useDashboardFilters } from "../hooks/useDashboardFilters";
import { usePropertyPerformance } from "../hooks/usePropertyPerformance";
import { filterReviews, hasActiveFilters, sortReviews } from "../lib/filterReviews";
import { POSITIVE_THRESHOLD, effectiveRating, mean, round1 } from "../lib/reviews";
import { exportReviewsToExcel } from "../lib/exportReviews";
import { PropertyPerformance } from "../components/PropertyPerformance";
import { TrendsAndIssues } from "../components/TrendsAndIssues";
import { Filter } from "../components/Filter";
import { KpiCards } from "../components/KpiCards";
import { Reviews } from "../components/Reviews";
import NavBar from "../components/NavBar";
import { Badge, Button, Container, Skeleton } from "../components/ui";

const PAGE_SIZE = 10;
const EMPTY: Review[] = [];

const today = () => new Date().toISOString().slice(0, 10);

const DashboardSkeleton = () => (
  <div className="flex flex-col gap-5" aria-busy="true" aria-label="Loading reviews">
    <Skeleton className="h-36 w-full rounded-xl" />
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, i) => (
        <Skeleton key={i} className="h-24 rounded-xl" />
      ))}
    </div>
    <Skeleton className="h-80 w-full rounded-xl" />
  </div>
);

const Dashboard: React.FC = () => {
  const data = useReviews();
  const reviews = data.status === "ready" ? data.reviews : EMPTY;
  const { isApproved, setApproved } = useApprovals();
  const { filters, update, reset } = useDashboardFilters();

  // Keyed on the filters, so any filter change returns to page 1.
  const filterKey = JSON.stringify(filters);
  const [pageState, setPageState] = useState({ key: filterKey, page: 1 });
  const page = pageState.key === filterKey ? pageState.page : 1;
  const setPage = (p: number) => setPageState({ key: filterKey, page: p });

  const listingOptions = useMemo(
    () => Array.from(new Set(reviews.map((r) => r.listingName).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [reviews]
  );

  const filtered = useMemo(() => filterReviews(reviews, filters, isApproved), [reviews, filters, isApproved]);
  const sorted = useMemo(() => sortReviews(filtered, filters.sort), [filtered, filters.sort]);
  const perf = usePropertyPerformance(filtered);

  const stats = useMemo(() => {
    const ratings = filtered.map(effectiveRating).filter((v): v is number => v !== null);
    const avg = mean(ratings);
    return {
      total: filtered.length,
      avg: avg === null ? null : round1(avg),
      positivePct: ratings.length
        ? Math.round((ratings.filter((v) => v >= POSITIVE_THRESHOLD).length / ratings.length) * 100)
        : null,
      onWebsite: filtered.filter((r) => isApproved(r.id)).length,
    };
  }, [filtered, isApproved]);

  // Scroll once the filtered list has rendered; measuring earlier lands mid-list.
  const scrollToReviews = useRef(false);
  useEffect(() => {
    if (!scrollToReviews.current) return;
    scrollToReviews.current = false;
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
  }, [filters.listing]);

  const drillIntoListing = (listing: string) => {
    if (listing === filters.listing) {
      document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    scrollToReviews.current = true;
    update({ listing });
  };

  const currentPage = Math.min(page, Math.max(1, Math.ceil(sorted.length / PAGE_SIZE)));
  const pageRows = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const exports = [
    { label: "Current page", hint: `${pageRows.length} reviews`, rows: pageRows, name: "page" },
    { label: "Filtered results", hint: `${sorted.length} reviews`, rows: sorted, name: "filtered" },
    { label: "All reviews", hint: `${reviews.length} reviews`, rows: reviews, name: "all" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="pb-12 pt-6">
        <Container className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brand-text">Guest reviews</h1>
              <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-brand-muted">
                Monitor feedback across your properties and pick what goes on the website.
                {data.status === "ready" &&
                  (data.source === "live" ? (
                    <Badge className="bg-emerald-50 text-emerald-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live · Hostaway
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-50 text-amber-800">Sample data</Badge>
                  ))}
              </p>
            </div>

            <Menu as="div" className="relative">
              <MenuButton as={Button} variant="primary" disabled={data.status !== "ready"}>
                <ArrowDownTrayIcon className="h-4 w-4" aria-hidden />
                Export
                <ChevronDownIcon className="h-4 w-4" aria-hidden />
              </MenuButton>
              <MenuItems
                anchor="bottom end"
                className="z-40 mt-1 w-56 rounded-lg border border-brand-border bg-white p-1 shadow-lg focus:outline-none"
              >
                {exports.map((x) => (
                  <MenuItem key={x.name}>
                    <button
                      type="button"
                      onClick={() => exportReviewsToExcel(x.rows, isApproved, `reviews-${x.name}-${today()}.xlsx`)}
                      disabled={x.rows.length === 0}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-brand-text data-[focus]:bg-brand-bg disabled:opacity-50"
                    >
                      {x.label}
                      <span className="text-xs text-brand-muted">{x.hint}</span>
                    </button>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>

          {data.status === "ready" && data.notice && (
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              <InformationCircleIcon className="h-4 w-4 shrink-0" aria-hidden />
              <span className="flex-1">{data.notice}</span>
              <Button size="sm" variant="ghost" className="text-amber-900" onClick={data.retry}>
                <ArrowPathIcon className="h-3.5 w-3.5" aria-hidden /> Retry
              </Button>
            </div>
          )}

          {data.status === "loading" ? (
            <DashboardSkeleton />
          ) : (
            <>
              <Filter filters={filters} update={update} reset={reset} listingOptions={listingOptions} />

              <KpiCards {...stats} />

              {filtered.length === 0 && hasActiveFilters(filters) ? (
                <div className="rounded-xl border border-dashed border-brand-border bg-white/60 px-4 py-12 text-center">
                  <p className="font-medium text-brand-text">No reviews match these filters</p>
                  <Button className="mt-3" onClick={reset}>
                    Clear filters
                  </Button>
                </div>
              ) : (
                <>
                  <PropertyPerformance data={perf} onSelect={drillIntoListing} />
                  <TrendsAndIssues reviews={filtered} onSelectListing={drillIntoListing} />
                  <Reviews
                    reviews={sorted}
                    page={currentPage}
                    pageSize={PAGE_SIZE}
                    setPage={setPage}
                    sort={filters.sort}
                    setSort={(sort) => update({ sort })}
                    isApproved={isApproved}
                    setApproved={setApproved}
                  />
                </>
              )}
            </>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
