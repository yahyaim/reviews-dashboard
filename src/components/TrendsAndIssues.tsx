import React, { Suspense } from "react";
import { Review } from "../types/review";
import { useTrends } from "../hooks/useTrends";
import styles from "../styles/Trends.module.css";


const Sparkline: React.FC<{ values: number[] }> = ({ values }) => {
  if (!values.length) return <div className={styles.sparkEmpty}>—</div>;
  const w = 180, h = 48, pad = 4;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const step = (w - pad * 2) / Math.max(1, values.length - 1);
  const points = values.map((v, i) => {
    const x = pad + i * step;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg className={styles.spark} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={points} />
    </svg>
  );
};

type Props = { reviews: Review[] };

export const TrendsAndIssues: React.FC<Props> = ({ reviews }) => {
  const { series, negativeShare, topKeywords, topBigrams, categoryDeltas, watchlist, listingsWithIssues } =
    useTrends(reviews);

  const avgSeries = series.map((s) => s.avg);
  const negSeries = negativeShare.map((s) => s.share);

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <h2 className={styles.title}>Spot Trends & Recurring Issues</h2>
        <p className={styles.sub}>Based on the current filters</p>
      </header>

      {/* Alerts / Watchlist */}
      {watchlist.length > 0 && (
        <div className={styles.alerts}>
          {watchlist.map((w, i) => (
            <div key={i} className={`${styles.alert} ${w.type === "drop" ? styles.drop : styles.spike}`}>
              <span className={styles.bullet} aria-hidden>●</span>
              {w.message}
            </div>
          ))}
        </div>
      )}

      {/* Mini metrics */}
      <div className={styles.kpis}>
        <div className={styles.kpi}>
          <div className={styles.kpiLabel}>Avg rating (trend)</div>
          <Sparkline values={avgSeries} />
          <div className={styles.kpiFoot}>
            {series.length ? `${series[0].month} → ${series[series.length-1].month}` : "—"}
          </div>
        </div>
        <div className={styles.kpi}>
          <div className={styles.kpiLabel}>Negative share %</div>
          <Sparkline values={negSeries} />
          <div className={styles.kpiFoot}>
            {negativeShare.length ? `${negativeShare[0].month} → ${negativeShare[negativeShare.length-1].month}` : "—"}
          </div>
        </div>

        <div className={styles.kpiTable}>
          <div className={styles.kpiLabel}>Category Δ (last vs prev month)</div>
          <div className={styles.deltaTable}>
            <div className={styles.deltaHead}>
              <span>Category</span><span>Prev</span><span>Last</span><span>Δ</span>
            </div>
            {categoryDeltas.map((c) => (
              <div key={c.key} className={styles.deltaRow}>
                <span className={styles.cap}>{c.key.replace(/_/g," ")}</span>
                <span>{c.prev ?? "—"}</span>
                <span>{c.last ?? "—"}</span>
                <span className={c.delta !== null && c.delta < 0 ? styles.bad : styles.good}>
                  {c.delta !== null ? (c.delta > 0 ? `+${c.delta}` : `${c.delta}`) : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top issues (keywords / bigrams) */}
      <div className={styles.issuesGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Recurring keywords (neg./neutral)</div>
          <div className={styles.chips}>
            {topKeywords.length === 0 ? <span className={styles.empty}>No data</span> :
              topKeywords.map(k => (
                <span key={k.term} className={styles.chip}>
                  <span>{k.term}</span>
                  <b className={styles.count}>{k.count}</b>
                </span>
              ))}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Common 2-word phrases</div>
          <div className={styles.chips}>
            {topBigrams.length === 0 ? <span className={styles.empty}>No data</span> :
              topBigrams.map(k => (
                <span key={k.term} className={styles.chip}>
                  <span>{k.term}</span>
                  <b className={styles.count}>{k.count}</b>
                </span>
              ))}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Listings with most negatives</div>
          <ul className={styles.list}>
            {listingsWithIssues.length === 0 ? <li className={styles.empty}>No negatives found</li> :
              listingsWithIssues.map((l) => (
                <li key={l.listing} className={styles.listRow}>
                  <span className={styles.listing}>{l.listing}</span>
                  <span className={styles.badBadge}>{l.negatives}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Optional: lazy-loaded word cloud if you want it */}
      {/* 
        npm i react-wordcloud d3-cloud
        const WordCloud = React.lazy(() => import('./WordCloudOptional'));
        <Suspense fallback={<div className={styles.card}>Loading word cloud…</div>}>
          <WordCloud words={topKeywords} />
        </Suspense>
      */}
    </section>
  );
};
