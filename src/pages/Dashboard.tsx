// src/pages/Dashboard.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Review } from "../types/review";
import { mockReviews } from "../mocks/reviews";
import ReviewList from "../components/ReviewList";
import styles from "../styles/Dashboard.module.css";
import ReviewSnippet from "../components/ReviewSnippet";

type SourceTab = "All" | "Hostaway" | "Google";

const Dashboard: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SourceTab>("All");

  // simulate load
  useEffect(() => {
    const t = setTimeout(() => setReviews(mockReviews), 500);
    return () => clearTimeout(t);
  }, []);

  // summary stats
  const stats = useMemo(() => {
    const total = reviews.length;
    const ratings = reviews.map(r => r.rating).filter((n): n is number => typeof n === "number");
    const avg =
      ratings.length === 0
        ? 0
        : Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10;

    const positivePct =
      total === 0
        ? 0
        : Math.round(
            (reviews.filter(r => (typeof r.rating === "number" ? r.rating >= 9 : false)).length /
              total) *
              100
          );

    return { total, avg, positivePct };
  }, [reviews]);

  // filter by tab + search
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reviews.filter(r => {
      const src = r.source ?? "Hostaway";
      const tabOk = activeTab === "All" ? true : src === activeTab;
      const haystack = `${r.guestName} ${r.listingName} ${r.publicReview}`.toLowerCase();
      const qOk = q ? haystack.includes(q) : true;
      return tabOk && qOk;
    });
  }, [reviews, query, activeTab]);

  return (
    <div className={styles.container}>
      {/* page header */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Reviews</h1>
          <p className={styles.subtitle}>
            Manage and respond to guest feedback across all platforms.
          </p>
        </div>
      </div>

      {/* summary cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Total Reviews</div>
          <div className={styles.statValue}>
            <strong>{stats.total.toLocaleString()}</strong>
            <span className={`${styles.delta} ${styles.positive}`}>+12%</span>
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statLabel}>Average Rating</div>
          <div className={styles.statValue}>
            <strong>{stats.avg || "—"}</strong>
            <span className={`${styles.delta} ${styles.negative}`}>-0.1%</span>
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statLabel}>Positive Sentiment</div>
          <div className={styles.statValue}>
            <strong>{stats.positivePct}%</strong>
            <span className={`${styles.delta} ${styles.positive}`}>+5%</span>
          </div>
        </div>
      </div>

      {/* filters + search */}
      <div className={styles.toolbar}>
        <div className={styles.tabs}>
          {(["All", "Hostaway", "Google"] as const).map(t => (
            <button
              key={t}
              className={`${styles.tab} ${activeTab === t ? styles.active : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className={styles.search}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <input
            placeholder="Search reviews"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* list/table */}
      <section className={styles.list}>
        <div className={styles.listHeader}>
          <span>Guest</span>
          <span>Listing</span>
          <span>Rating</span>
          <span>Review</span>
          <span>Source</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {shown.length === 0 ? (
          <div className={styles.empty}>No reviews found.</div>
        ) : (
          shown.map(r => (
            <div key={r.id} className={styles.listRow}>
              <div style={{ fontWeight: 600 }}>{r.guestName}</div>
              <div>{r.listingName}</div>
              <div>{typeof r.rating === "number" ? r.rating : "—"}</div>
              <div>
                {/* reuse your card renderer for the text + category chips */}
                {/* <ReviewList reviews={[r]} /> */}
                <ReviewSnippet review={r} />
              </div>
              <div>
                <span className={styles.source}>{r.source ?? "Hostaway"}</span>
              </div>
              <div>{r.submittedAt.split(" ")[0]}</div>
              <div className={styles.action}>Approve</div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Dashboard;
