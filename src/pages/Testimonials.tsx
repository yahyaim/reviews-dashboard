import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, type Transition, motion } from "motion/react";

/** ===== Types ===== */
type ReviewInput = {
  id: number | string;
  publicReview?: string;
  rating?: number;
  guestName?: string;
  listingName?: string;
  city?: string;
  submittedAt?: string;
  approved?: boolean;
  avatarUrl?: string;
};

declare global {
  interface Window {
    __APPROVED_REVIEWS__?: ReviewInput[];
  }
}

/** ===== Helpers ===== */
const transition: Transition = { type: "spring", duration: 0.8 };
const toStars = (n?: number) =>
  Math.max(0, Math.min(5, Math.round(((n ?? 0) / 10) * 5)));

/** ===== Atoms ===== */
const Avatar = ({
  src="src/assets/user.png",
  alt = "Avatar",
  size = "2xl",
}: {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
  };
  return (
    <div
      className={`overflow-hidden rounded-full bg-gray-200 ${sizeMap[size]} flex items-center justify-center`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-gray-500 text-sm">?</span>
      )}
    </div>
  );
};

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 8.24l-7.19-.62L12 1 9.19 7.62 2 8.24l5.46 5.73L5.82 21z" />
  </svg>
);

const PaginationDot = ({
  page,
  total,
  size = "lg",
  onPageChange,
}: {
  page: number;
  total: number;
  size?: "sm" | "md" | "lg";
  onPageChange: (p: number) => void;
}) => {
  const dotSize =
    size === "lg" ? "w-4 h-4" : size === "sm" ? "w-2 h-2" : "w-3 h-3";
  return (
    <div className="flex gap-2 mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`rounded-full transition-all ${dotSize} ${
            i + 1 === page
              ? "bg-[#284e4c]"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Go to review ${i + 1}`}
        />
      ))}
    </div>
  );
};

/** ===== Navbar ===== */
const NavBar = () => {
  const { pathname } = useLocation();
  const cls = (to: string) =>
    `inline-flex items-center h-9 px-3 rounded-md text-sm no-underline transition-colors ${
      pathname === to
        ? "font-semibold text-[#284e4c]"
        : "hover:text-[#284e4c] text-gray-800"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 md:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md"
            style={{ backgroundColor: "#284e4c" }}
          />
          <span className="font-semibold text-gray-900">The Company • Reviews</span>
        </div>
        <nav className="flex items-center gap-2">
          <Link to="/" className={cls("/")}>
            Dashboard
          </Link>
          <Link to="/testimonials" className={cls("/testimonials")}>
            Testimonials
          </Link>
        </nav>
      </div>
    </header>
  );
};

/** ===== Main Page ===== */
export default function Testimonials() {
  const [items, setItems] = useState<
    {
      id: string;
      quote: string;
      author: { name: string; title?: string; avatarUrl?: string };
      stars: number;
    }[]
  >([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const total = items.length;

  useEffect(() => {
    const data: ReviewInput[] =
      (typeof window !== "undefined" && window.__APPROVED_REVIEWS__) || [];

    const prepared = [...data]
      .filter((r) => r.approved !== false)
      .sort((a, b) => {
        const ad = a.submittedAt ? Date.parse(a.submittedAt) : 0;
        const bd = b.submittedAt ? Date.parse(b.submittedAt) : 0;
        return bd - ad;
      })
      .map((r) => ({
        id: String(r.id),
        quote: r.publicReview || "Great stay!",
        author: {
          name: r.guestName || "Verified guest",
          title: [
            r.listingName && `Stayed at ${r.listingName}`,
            r.city,
            r.submittedAt && new Date(r.submittedAt).toLocaleDateString(),
          ]
            .filter(Boolean)
            .join(" • "),
          avatarUrl: r.avatarUrl,
        },
        stars: toStars(r.rating),
      }));

    setItems(prepared);
  }, []);

  if (total === 0) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600">
          No testimonials yet.
        </div>
      </>
    );
  }

  const review = items[currentReviewIndex];

  return (
    <>
      <NavBar />

      <main className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gray-50 px-4">
        <section className="w-full max-w-3xl text-center flex flex-col items-center">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.blockquote
              key={currentReviewIndex + "-quote"}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { ...transition, delay: 0.3 },
              }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="text-3xl md:text-4xl font-semibold text-[#284e4c] leading-snug mb-8"
            >
              “{review.quote}”
            </motion.blockquote>

            <motion.figcaption
              key={currentReviewIndex + "-author"}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { ...transition, delay: 0.5 },
              }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="flex flex-col items-center gap-3"
            >
              <Avatar
                src={review.author.avatarUrl}
                alt={review.author.name}
                size="2xl"
              />
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {review.author.name}
                </p>
                {review.author.title && (
                  <cite className="not-italic text-gray-600 text-sm">
                    {review.author.title}
                  </cite>
                )}
              </div>

              <div
                className="flex gap-1 mt-3"
                style={{ color: "#284e4c" }}
                aria-hidden="true"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < review.stars ? "opacity-100" : "opacity-40"
                    }
                  >
                    <StarIcon />
                  </span>
                ))}
              </div>
            </motion.figcaption>
          </AnimatePresence>

          <PaginationDot
            page={currentReviewIndex + 1}
            total={total}
            onPageChange={(p) => setCurrentReviewIndex(p - 1)}
          />
        </section>
      </main>
    </>
  );
}
