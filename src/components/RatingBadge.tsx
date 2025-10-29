import React from "react";
import styles from "../styles/RatingBadge.module.css";

interface Props {
  category: string;
  rating: number;
}

const RatingBadge: React.FC<Props> = ({ category, rating }) => {
  return (
    <div className={styles.badge}>
      <span style={{ textTransform: "capitalize" }}>{category}</span>
      <span>{rating}/10</span>
    </div>
  );
};
export default RatingBadge;
