import React from "react";
import { Review } from "../types/review";
import s from "../styles/ReviewSnippet.module.css";

const ReviewSnippet: React.FC<{ review: Review }> = ({ review }) => {
  const chips = review.reviewCategory?.slice(0, 2) ?? []; // show at most 2
  const more = (review.reviewCategory?.length ?? 0) - chips.length;

  return (
    <div className={s.snippet}>
      <p className={s.text} title={review.publicReview}>
        {review.publicReview}
      </p>
      {!!chips.length && (
        <div className={s.chips}>
          {chips.map((c) => (
            <span key={c.category} className={s.chip}>
              <span className={s.cap}>{c.category.replace(/_/g, " ")}</span>
              <strong className={s.score}>{c.rating}/10</strong>
            </span>
          ))}
          {more > 0 && <span className={s.more}>+{more} more</span>}
        </div>
      )}
    </div>
  );
};

export default ReviewSnippet;
