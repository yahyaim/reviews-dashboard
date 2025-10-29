import React from "react";
import { Review } from "../types/review";
import ReviewCard from "./ReviewCard";

const ReviewList: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};
export default ReviewList;
