import React from "react";
import { Review } from "../types/review";
import RatingBadge from "./RatingBadge";
import styles from "../styles/ReviewCard.module.css";

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.guestName}>{review.guestName}</h3>
        <span className={styles.date}>{review.submittedAt?.split(" ")[0]}</span>
      </div>
      <p className={styles.reviewText}>
        {review.publicReview?.length > 180
          ? review.publicReview.slice(0, 180) + "…"
          : review.publicReview}
      </p>
      {review.reviewCategory?.length ? (
        <div className={styles.categories}>
          {review.reviewCategory.map((cat) => (
            <RatingBadge key={cat.category} category={cat.category} rating={cat.rating} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ReviewCard;
