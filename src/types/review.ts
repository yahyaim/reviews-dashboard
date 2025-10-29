export interface ReviewCategory {
  category: string;
  rating: number;
}

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

export interface ReviewsResponse {
  status: "success" | "error";
  result: Review[];
}
