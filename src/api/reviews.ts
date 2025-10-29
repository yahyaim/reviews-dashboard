import { ReviewsResponse } from "../types/review";

export const fetchReviews = async (): Promise<ReviewsResponse> => {
  const response = await fetch("HOSTAWAYS_API_ENDPOINT");
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
};
