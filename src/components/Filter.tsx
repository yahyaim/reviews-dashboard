import React from "react";
import styles from "../styles/Dashboard.module.css";

type ChannelTab = "All" | "Hostaway" | "Google";
type CategoryKey = "cleanliness" | "communication" | "respect_house_rules";

type FiltersProps = {
  // values
  query: string;
  channel: ChannelTab;
  ratingBand: "All" | "10" | "9-8" | "<8";
  category: "All" | CategoryKey;
  fromDate: string;
  toDate: string;
  listing: "All" | string;

  // setters
  setQuery: (v: string) => void;
  setChannel: (v: ChannelTab) => void;
  setRatingBand: (v: "All" | "10" | "9-8" | "<8") => void;
  setCategory: (v: "All" | CategoryKey) => void;
  setFromDate: (v: string) => void;
  setToDate: (v: string) => void;
  setListing: (v: "All" | string) => void;

  // data
  categoryOptions: { key: CategoryKey; label: string }[];
  listingOptions: string[];

  // actions
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
    <header className={styles.filterBar}>
      <h1 className={styles.title}>Manager Dashboard</h1>

      {/* Row 1: dropdowns + dates */}
      <div className={styles.filtersGridTop}>
        <div className={styles.inlineField}>
          <span className={styles.inlineLabel}>Channel</span>
          <select
            className={styles.select}
            value={channel}
            onChange={(e) => setChannel(e.target.value as ChannelTab)}
          >
            <option value="All">All Channels</option>
            <option value="Hostaway">Hostaway</option>
            <option value="Google">Google</option>
          </select>
        </div>

        <div className={styles.inlineField}>
          <span className={styles.inlineLabel}>Rating</span>
          <select
            className={styles.select}
            value={ratingBand}
            onChange={(e) => setRatingBand(e.target.value as typeof ratingBand)}
          >
            <option value="All">All Ratings</option>
            <option value="10">10</option>
            <option value="9-8">9–8</option>
            <option value="<8">Below 8</option>
          </select>
        </div>

        <div className={styles.inlineField}>
          <span className={styles.inlineLabel}>Category</span>
          <select
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          >
            <option value="All">All Categories</option>
            {categoryOptions.map((c) => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.inlineField}>
          <span className={styles.inlineLabel}>Listing</span>
          <select
            className={styles.select}
            value={listing}
            onChange={(e) => setListing(e.target.value as any)}
          >
            <option value="All">All Listings</option>
            {listingOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className={styles.inlineField} style={{ gridColumn: "span 2" }}>
  <span className={styles.inlineLabel}>Date range</span>
  <div className={styles.dateRange}>
    <span className={styles.datePrefix}>From</span>
    <input
      className={styles.inputDate}
      type="date"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
    />
    <span className={styles.dateDash}>–</span>
    <span className={styles.datePrefix}>To</span>
    <input
      className={styles.inputDate}
      type="date"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
    />
    {(fromDate || toDate) && (
      <button
        type="button"
        className={styles.dateClear}
        aria-label="Clear date range"
        onClick={() => { setFromDate(""); setToDate(""); }}
      >
        ×
      </button>
    )}
  </div>
</div>
      </div>

      {/* Row 2: search + actions */}
      <div className={styles.filtersGridBottom}>
        <div className={styles.search}>
          <input
            placeholder="Search guest, listing, review…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className={styles.searchClear}
              aria-label="Clear search"
              onClick={() => setQuery("")}
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

        <div className={styles.actionsRight}>
          <button className={styles.resetBtnPrimary} onClick={resetAll} type="button">
            Reset filters
          </button>
          <div className={styles.exportGroup}>
            <button className={styles.exportBtn} onClick={onExportCurrentPage} type="button">
              Export current page
            </button>
            <button className={styles.exportBtn} onClick={onExportFiltered} type="button">
              Export filtered
            </button>
            <button className={styles.exportBtn} onClick={onExportAll} type="button">
              Export all
            </button>
          </div>
        </div>
      </div>

      {/* Chips: single-line scroller; never grows height */}
      <div className={styles.chipsScroller}>
        {activeChips.map((c, i) => (
          <button key={i} className={styles.activeChip} onClick={c.onRemove} title="Remove filter">
            <span>{c.label}</span>
            <svg viewBox="0 0 20 20" className={styles.chipX} aria-hidden>
              <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        ))}
      </div>
    </header>
  );
};
