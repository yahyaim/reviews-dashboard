import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, type Transition, motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
import NavBar from "../components/NavBar";
import { Skeleton } from "../components/ui";
import { useReviews } from "../hooks/useReviews";
import { useApprovals } from "../hooks/useApprovals";
import { effectiveRating, formatDate } from "../lib/reviews";

const transition: Transition = { type: "spring", duration: 0.8 };

/** 0–10 score → 0–5 stars. */
const toStars = (n: number | null) => Math.max(0, Math.min(5, Math.round(((n ?? 0) / 10) * 5)));

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("") || "G";

const ArrowButton = ({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) => {
  const Icon = dir === "prev" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="rounded-full border border-brand-border bg-white p-2 text-brand-accent shadow-card transition-colors hover:bg-brand-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
};

export default function Testimonials() {
  const data = useReviews();
  const { isApproved } = useApprovals();
  const [index, setIndex] = useState(0);

  const items = useMemo(() => {
    if (data.status !== "ready") return [];
    return data.reviews
      .filter((r) => isApproved(r.id) && r.publicReview.trim())
      .sort((a, b) => (b.submittedAt ?? "").localeCompare(a.submittedAt ?? ""))
      .map((r) => ({
        id: String(r.id),
        quote: r.publicReview.trim(),
        name: r.guestName || "Verified guest",
        detail: [r.listingName && `Stayed at ${r.listingName}`, formatDate(r.submittedAt)].filter(Boolean).join(" · "),
        stars: toStars(effectiveRating(r)),
      }));
  }, [data, isApproved]);

  const total = items.length;
  const current = total ? Math.min(index, total - 1) : 0;
  const go = (delta: number) => total && setIndex((current + delta + total) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const review = items[current];

  return (
    <>
      <NavBar />
      <main className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-12">
        {data.status === "loading" ? (
          <div className="flex w-full max-w-2xl flex-col items-center gap-4" aria-busy="true">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="mt-4 h-20 w-20 rounded-full" />
          </div>
        ) : !review ? (
          <div className="max-w-md text-center">
            <h1 className="text-xl font-semibold text-brand-text">No testimonials yet</h1>
            <p className="mt-2 text-sm text-brand-muted">
              Reviews appear here once a manager approves them for the website.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex h-10 items-center rounded-lg bg-brand-accent px-4 text-sm font-medium text-white hover:bg-brand-accent/90"
            >
              Choose reviews in the dashboard
            </Link>
          </div>
        ) : (
          <section className="flex w-full max-w-3xl flex-col items-center text-center" aria-roledescription="carousel" aria-label="Guest testimonials">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.blockquote
                key={`${review.id}-quote`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { ...transition, delay: 0.2 } }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                className="mb-8 text-2xl font-semibold leading-snug text-brand-accent md:text-4xl"
              >
                “{review.quote}”
              </motion.blockquote>

              <motion.figcaption
                key={`${review.id}-author`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { ...transition, delay: 0.35 } }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                className="flex flex-col items-center gap-3"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent/10 text-xl font-semibold text-brand-accent" aria-hidden>
                  {initials(review.name)}
                </span>
                <div>
                  <p className="text-lg font-semibold text-brand-text">{review.name}</p>
                  <cite className="text-sm not-italic text-brand-muted">{review.detail}</cite>
                </div>
                <div className="flex gap-0.5 text-brand-accent" role="img" aria-label={`${review.stars} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} className={`h-6 w-6 ${i < review.stars ? "" : "opacity-25"}`} aria-hidden />
                  ))}
                </div>
              </motion.figcaption>
            </AnimatePresence>

            {total > 1 && (
              <div className="mt-8 flex items-center gap-4">
                <ArrowButton dir="prev" onClick={() => go(-1)} />
                {total <= 12 ? (
                  <div className="flex gap-2">
                    {items.map((it, i) => (
                      <button
                        key={it.id}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to testimonial ${i + 1}`}
                        aria-current={i === current}
                        className={`h-2.5 rounded-full transition-all ${i === current ? "w-6 bg-brand-accent" : "w-2.5 bg-brand-border hover:bg-brand-muted"}`}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-sm tabular-nums text-brand-muted" aria-live="polite">
                    {current + 1} / {total}
                  </span>
                )}
                <ArrowButton dir="next" onClick={() => go(1)} />
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
}
