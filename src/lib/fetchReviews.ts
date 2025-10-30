import { mockReviews } from "../mocks/reviews";
import { normalizeHostaway } from "./normalize";

export async function fetchReviewsLocal() {
    return { reviews: mockReviews.map(normalizeHostaway) };
}