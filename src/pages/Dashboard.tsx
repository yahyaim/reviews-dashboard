import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Review } from "../types/review";
import { mockReviews } from "../mocks/reviews";
import ReviewSnippet from "../components/ReviewSnippet";
import styles from "../styles/Dashboard.module.css";

type SourceTab = "All" | "Hostaway" | "Google";

const Dashboard: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SourceTab>("All");

  useEffect(() => {
    const t = setTimeout(() => setReviews(mockReviews), 500);
    return () => clearTimeout(t);
  }, []);

  const stats = useMemo(() => {
    const total = reviews.length;
    const ratings = reviews.map((r) => r.rating ?? 0);
    const avg =
      ratings.length === 0
        ? 0
        : Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10;
    const positivePct =
      total === 0
        ? 0
        : Math.round(
            (reviews.filter((r) => (r.rating ?? 0) >= 9).length / total) * 100
          );
    return { total, avg, positivePct };
  }, [reviews]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return reviews.filter((r) => {
      const src = r.source ?? "Hostaway";
      const matchTab = activeTab === "All" ? true : src === activeTab;
      const hay = `${r.guestName} ${r.listingName} ${r.publicReview}`.toLowerCase();
      return matchTab && (q ? hay.includes(q) : true);
    });
  }, [reviews, query, activeTab]);

  return (
    <MainLayout pageTitle="Reviews">
      <div className={styles.container}>
        {/* Summary */}
        <div className={styles.summaryGrid}>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Total Reviews</div>
            <div className={styles.statValue}>
              <strong>{stats.total}</strong>
              <span className={`${styles.delta} ${styles.positive}`}>+12%</span>
            </div>
          </div>

          <div className={styles.stat}>
            <div className={styles.statLabel}>Average Rating</div>
            <div className={styles.statValue}>
              <strong>{stats.avg}</strong>
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

        {/* Tabs + Search */}
        <div className={styles.toolbar}>
          <div className={styles.tabs}>
            {(["All", "Hostaway", "Google"] as const).map((t) => (
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
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Review List */}
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

          {filtered.length === 0 ? (
            <div className={styles.empty}>No reviews found.</div>
          ) : (
            filtered.map((r) => (
              <div key={r.id} className={styles.listRow}>
                <div style={{ fontWeight: 600 }}>{r.guestName}</div>
                <div>{r.listingName}</div>
                <div>{r.rating}</div>
                <div>
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
    </MainLayout>
  );
};

export default Dashboard;
