import React from "react";
import { Button, Card, Container, Input, Select } from "./ui";

type ChannelTab = "All" | "Hostaway" | "Google";
type CategoryKey = "cleanliness" | "communication" | "respect_house_rules";

type FiltersProps = {
  query: string;
  channel: ChannelTab;
  ratingBand: "All" | "10" | "9-8" | "<8";
  category: "All" | CategoryKey;
  fromDate: string;
  toDate: string;
  listing: "All" | string;

  setQuery: (v: string) => void;
  setChannel: (v: ChannelTab) => void;
  setRatingBand: (v: "All" | "10" | "9-8" | "<8") => void;
  setCategory: (v: "All" | CategoryKey) => void;
  setFromDate: (v: string) => void;
  setToDate: (v: string) => void;
  setListing: (v: "All" | string) => void;

  categoryOptions: { key: CategoryKey; label: string }[];
  listingOptions: string[];

  activeChips: { label: string; onRemove: () => void }[];
  resetAll: () => void;

  onExportCurrentPage: () => void;
  onExportFiltered: () => void;
  onExportAll: () => void;
};

export const Filter: React.FC<FiltersProps> = ({
  query, setQuery,
  channel, setChannel,
  ratingBand, setRatingBand,
  category, setCategory,
  fromDate, setFromDate,
  toDate, setToDate,
  listing, setListing,
  categoryOptions, listingOptions,
  activeChips, resetAll,
  onExportCurrentPage, onExportFiltered, onExportAll
}) => {
  return (
    <Container>
      <div className="mb-2 flex items-end justify-between">
        <h1 className="text-2xl font-bold text-brand-accent">Dashboard</h1>
      </div>

      <Card>
        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <span className="mb-1 block text-xs font-medium text-brand-muted">Channel</span>
            <Select value={channel} onChange={(e) => setChannel(e.target.value as ChannelTab)}>
              <option value="All">All Channels</option>
              <option value="Hostaway">Hostaway</option>
              <option value="Google">Google</option>
            </Select>
          </div>

          <div>
            <span className="mb-1 block text-xs font-medium text-brand-muted">Rating</span>
            <Select value={ratingBand} onChange={(e) => setRatingBand(e.target.value as typeof ratingBand)}>
              <option value="All">All Ratings</option>
              <option value="10">10</option>
              <option value="9-8">9–8</option>
              <option value="<8">Below 8</option>
            </Select>
          </div>

          <div>
            <span className="mb-1 block text-xs font-medium text-brand-muted">Category</span>
            <Select value={category} onChange={(e) => setCategory(e.target.value as any)}>
              <option value="All">All Categories</option>
              {categoryOptions.map((c) => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </Select>
          </div>

          <div>
            <span className="mb-1 block text-xs font-medium text-brand-muted">Listing</span>
            <Select value={listing} onChange={(e) => setListing(e.target.value as any)}>
              <option value="All">All Listings</option>
              {listingOptions.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </Select>
          </div>

          <div className="flex items-end">
            <div className="flex w-full items-center gap-2 rounded-lg border border-brand-border bg-white px-3 pr-4 h-11 focus-within:ring-2 focus-within:ring-[#c9d7d6]">
              <input
                className="flex-1 border-0 bg-transparent text-sm placeholder:text-brand-muted focus:outline-none focus:ring-0"
                placeholder="Search guest, listing, review…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  className="text-lg leading-none text-brand-muted hover:text-brand-text"
                  onClick={() => setQuery("")}
                >
                  ×
                </button>
              )}
              <svg
                className="h-5 w-5 text-brand-muted"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-3 border-t border-brand-border/60 p-4 sm:grid-cols-2">
          {/* Date range */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-brand-muted">From</span>
            <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="max-w-[160px]" />
            <span className="text-brand-muted">–</span>
            <span className="text-xs text-brand-muted">To</span>
            <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="max-w-[160px]" />
            {(fromDate || toDate) && (
              <button
                type="button"
                aria-label="Clear date range"
                onClick={() => { setFromDate(""); setToDate(""); }}
                className="ml-1 text-lg leading-none text-brand-muted"
              >
                ×
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              onClick={resetAll}
              type="button"
              className="h-11 rounded-lg bg-brand-accent px-4 text-sm font-medium text-black hover:brightness-110 transition-colors"
            >
              Reset filters
            </button>
            <div className="flex flex-wrap gap-2">
              <Button onClick={onExportCurrentPage}>Export current page</Button>
              <Button onClick={onExportFiltered}>Export filtered</Button>
              <Button onClick={onExportAll}>Export all</Button>
            </div>
          </div>
        </div>

        {/* Active chips */}
        <div className="flex min-h-[34px] gap-2 overflow-x-auto border-t border-brand-border/60 p-3">
          {activeChips.map((c, i) => (
            <button
              key={i}
              title="Remove filter"
              onClick={c.onRemove}
              className="inline-flex items-center gap-2 rounded-full border border-[#d6e3e2] bg-[#e8f0ef] px-3 py-1 text-xs text-brand-accent"
            >
              <span>{c.label}</span>
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
                <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          ))}
        </div>
      </Card>
    </Container>
  );
};
