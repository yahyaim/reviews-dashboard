export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface ReviewsResponse {
  status: "success" | "error";
  result: Review[];
}

export type ReviewSource = "Hostaway" | "Google";
export type ReviewType = "guest-to-host" | "host-to-guest";

export interface Review {
  id: number;
  type: string;     // "host-to-guest"
  status: string;   // "published"
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;

  // NEW (optional so you don't break existing data)
  source?: "Hostaway" | "Google";
}

export interface ReviewCategoryScore {
  category: string; // e.g., "cleanliness", "communication"
  score: number; // 0–10 scale
}

export interface ReviewNormalized {
  id: string | number;
  listingId: string | number;
  listingName: string;
  reviewType: ReviewType; // used to exclude host→guest from public
  channel: ReviewSource; // Hostaway | Google
  overallRating: number | null;
  categories: ReviewCategoryScore[];
  guestName: string;
  publicReview: string;
  submittedAt: string; // ISO string
  approved: boolean; // manager approval state
}
