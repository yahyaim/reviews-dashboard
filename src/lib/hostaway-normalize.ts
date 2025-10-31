export type ReviewCategory = { category: string; rating: number };
export type Review = {
  id: number | string;
  type?: string;
  status?: string;
  rating?: number | null;
  publicReview?: string;
  reviewCategory?: ReviewCategory[];
  submittedAt?: string;
  guestName?: string;
  listingName?: string;
  source?: string;
};

export function normalizeHostawayReview(r: any): Review {
  
  return {r} as any;
}
