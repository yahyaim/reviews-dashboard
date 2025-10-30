import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { Review } from "../types/review";
import { mockReviews } from "../mocks/reviews";
import styles from "../styles/Dashboard.module.css";
import { fetchAllReviewsHostaway } from "../api/hostways";
import { usePropertyPerformance } from "../hooks/usePropertyPerformance";
import { PropertyPerformance } from "../components/PropertyPerformance";
import { TrendsAndIssues } from "../components/TrendsAndIssues";
import { Filter } from "../components/Filter";
import { Reviews } from "../components/Reviews";

type ChannelTab = "All" | "Hostaway" | "Google";
type CategoryKey = "cleanliness" | "communication" | "respect_house_rules";

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "cleanliness", label: "Cleanliness" },
  { key: "communication", label: "Communication" },
  { key: "respect_house_rules", label: "House Rules" },
];



const Dashboard: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Filters
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState<ChannelTab>("All");
  const [ratingBand, setRatingBand] = useState<"All" | "10" | "9-8" | "<8">("All");
  const [category, setCategory] = useState<"All" | CategoryKey>("All");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [listing, setListing] = useState<"All" | string>("All"); // NEW

  // Pagination
  const [page, setPage] = useState(1);
  

  // Public selection map (Show on Website)
  const [publicMap, setPublicMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Use mocks for perceived performance
    setReviews(mockReviews);

    // Try Hostaway; keep mocks if empty/fails
    (async () => {
      try {
        const res = await fetchAllReviewsHostaway(
          { sortOrder: "desc" },
          100,
          50
        );
        if (Array.isArray(res.result) && res.result.length > 0) {
          setReviews(res.result);
        }
      } catch (err) {
        console.error("Hostaway fetch failed; using mocks", err);
      }
    })();
  }, []);

  // Initialize publicMap when reviews load
  useEffect(() => {
    if (!reviews?.length) return;
    setPublicMap((prev) => {
      const next = { ...prev };
      for (const r of reviews) {
        if (next[r.id] === undefined) next[r.id] = true; // default to public
      }
      return next;
    });
  }, [reviews]);

  // Reset to page 1 whenever filters/search change
  useEffect(() => {
    setPage(1);
  }, [query, channel, ratingBand, category, fromDate, toDate, listing]);

  const safeDate = (s?: string) => {
    if (!s) return "";
    return s.includes("T") ? s.split("T")[0] : s.split(" ")[0];
  };

  const inBand = (v: number) => {
    if (ratingBand === "All") return true;
    if (ratingBand === "10") return v === 10;
    if (ratingBand === "9-8") return v >= 8 && v <= 9.999;
    return v < 8;
  };

  const matchCategory = (r: Review) => {
    if (category === "All") return true;
    const found = r.reviewCategory?.find((c) => c.category === category);
    return !!found;
  };

  const inDate = (s?: string) => {
    if (!s) return true;
    const d = safeDate(s);
    if (fromDate && d < fromDate) return false;
    if (toDate && d > toDate) return false;
    return true;
  };

  // Unique listing options (sorted)
  const listingOptions = useMemo(() => {
    const set = new Set<string>();
    for (const r of reviews) {
      if (r.listingName) set.add(r.listingName);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [reviews]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reviews.filter((r) => {
      const src = r.source ?? "Hostaway";
      const matchChannel = channel === "All" ? true : src === channel;

      // NEW: Match listing
      const matchListing = listing === "All" ? true : (r.listingName || "") === listing;

      const hay = `${r.guestName} ${r.listingName} ${r.publicReview}`.toLowerCase();
      const matchQ = q ? hay.includes(q) : true;
      const v = r.rating ?? 0;

      return matchChannel && matchListing && matchQ && inBand(v) && matchCategory(r) && inDate(r.submittedAt);
    });
  }, [reviews, query, channel, ratingBand, category, fromDate, toDate, listing]);

  const stats = useMemo(() => {
    const base = filtered;
    const total = base.length;
    const ratings = base.map((r) => r.rating ?? 0);

    const avg =
      ratings.length === 0
        ? 0
        : Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10;

    const positivePct =
      total === 0
        ? 0
        : Math.round((base.filter((r) => (r.rating ?? 0) >= 9).length / total) * 100);

    return { total, avg, positivePct };
  }, [filtered]);

  const perf = usePropertyPerformance(filtered);

  // ---------- Export helpers ----------
  type Row = {
    ID: number | string;
    Guest: string;
    Listing: string;
    Rating: number | string;
    Cleanliness: number | string;
    Communication: number | string;
    HouseRules: number | string;
    Source: string;
    Date: string;
    Public: "Public" | "Hidden";
    Review: string;
  };

  const getCategoryScore = (r: Review, key: CategoryKey) =>
    r.reviewCategory?.find((c) => c.category === key)?.rating ?? "";

  const toRows = (input: Review[]): Row[] =>
    input.map((r) => ({
      ID: r.id,
      Guest: r.guestName || "",
      Listing: r.listingName || "",
      Rating: r.rating ?? "",
      Cleanliness: getCategoryScore(r, "cleanliness"),
      Communication: getCategoryScore(r, "communication"),
      HouseRules: getCategoryScore(r, "respect_house_rules"),
      Source: r.source ?? "Hostaway",
      Date: safeDate(r.submittedAt),
      Public: publicMap[r.id] ? "Public" : "Hidden",
      Review: r.publicReview || "",
    }));

  const exportToExcel = (rows: Row[], filename: string) => {
    const wb = XLSX.utils.book_new();
    const headerOrder = [
      "ID","Guest","Listing","Rating","Cleanliness","Communication","HouseRules","Source","Date","Public","Review",
    ] as const;

    const ordered = rows.map((r) => {
      const o: any = {};
      headerOrder.forEach((k) => (o[k] = (r as any)[k]));
      return o;
    });
    const wsOrdered = XLSX.utils.json_to_sheet(ordered);
    wsOrdered["!cols"] = [
      { wch: 8 }, { wch: 24 }, { wch: 28 }, { wch: 8 },
      { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 12 },
      { wch: 12 }, { wch: 10 }, { wch: 60 }
    ];
    XLSX.utils.book_append_sheet(wb, wsOrdered, "Reviews");
    XLSX.writeFile(wb, filename);
  };

  // We compute pageRows locally for exportCurrentPage
  const PAGE_SIZE = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageRows = filtered.slice(startIdx, endIdx);

  const exportCurrentPage = () => exportToExcel(toRows(pageRows), "reviews_current_page.xlsx");
  const exportFiltered = () => exportToExcel(toRows(filtered), "reviews_filtered.xlsx");
  const exportAll = () => exportToExcel(toRows(reviews), "reviews_all.xlsx");

  // Active filter chips (for quick remove)
  const activeChips = [
    channel !== "All" && { label: `Channel: ${channel}`, onRemove: () => setChannel("All") },
    ratingBand !== "All" && { label: `Rating: ${ratingBand}`, onRemove: () => setRatingBand("All") },
    category !== "All" && {
      label: `Category: ${CATEGORIES.find((c) => c.key === category)?.label}`,
      onRemove: () => setCategory("All"),
    },
    listing !== "All" && { label: `Listing: ${listing}`, onRemove: () => setListing("All") }, // NEW chip
    fromDate && { label: `From: ${fromDate}`, onRemove: () => setFromDate("") },
    toDate && { label: `To: ${toDate}`, onRemove: () => setToDate("") },
    query && { label: `Search: “${query}”`, onRemove: () => setQuery("") },
  ].filter(Boolean) as { label: string; onRemove: () => void }[];

  const resetAll = () => {
    setQuery("");
    setChannel("All");
    setRatingBand("All");
    setCategory("All");
    setFromDate("");
    setToDate("");
    setListing("All");
  };

  return (
    <div className={styles.page}>
      {/* Filters / actions header */}
      <Filter
        query={query} setQuery={setQuery}
        channel={channel} setChannel={setChannel}
        ratingBand={ratingBand} setRatingBand={setRatingBand}
        category={category} setCategory={setCategory}
        fromDate={fromDate} setFromDate={setFromDate}
        toDate={toDate} setToDate={setToDate}
        listing={listing} setListing={setListing}
        categoryOptions={CATEGORIES}
        listingOptions={listingOptions}
        activeChips={activeChips}
        resetAll={resetAll}
        onExportCurrentPage={exportCurrentPage}
        onExportFiltered={exportFiltered}
        onExportAll={exportAll}
      />

      {/* KPI cards */}
      <section className={styles.summaryGrid}>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Total Reviews</div>
          <div className={styles.cardValue}>{stats.total}</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardLabel}>Average Rating</div>
          <div className={styles.cardValue}>{stats.avg}</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardLabel}>Positive (≥9)</div>
          <div className={styles.cardValue}>{stats.positivePct}%</div>
        </div>
      </section>

      {/* Property Performance */}
      <PropertyPerformance data={perf} />

      {/* Spot Trends & Issues */}
      <TrendsAndIssues reviews={filtered} />

      {/* Reviews Table */}
      <Reviews
         reviews={filtered}
         page={page}
         setPage={setPage}
         publicMap={publicMap}
         setPublicMap={setPublicMap}
      />
    </div>
  );
};

export default Dashboard;
