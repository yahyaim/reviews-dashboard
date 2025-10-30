import React, { useEffect, useState } from "react";
import { fetchReviewsLocal } from "../lib/fetchReviews";
import { loadApprovalMap } from "../lib/approvalStore";
import { ReviewNormalized } from "../types/review";

const PropertyReviews: React.FC = () => {
    const [reviews, setReviews] = useState<ReviewNormalized[]>([]);
    useEffect(() => {
        (async () => {
            const { reviews } = await fetchReviewsLocal();
            const map = loadApprovalMap();
            const approvedGuest = reviews.filter(r => r.reviewType === "guest-to-host" && (map[r.id] ?? r.approved));
            setReviews(approvedGuest);
        })();
    }, []);

    return (
        <div style={{ maxWidth: 800, margin: "40px auto", padding: 16 }}>
            <h1>Guest Reviews</h1>
            {reviews.map((r) => (
                <article key={String(r.id)} style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}>
                    <header style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <strong>{r.listingName}</strong>
                        <span aria-hidden>·</span>
                        <span>{r.overallRating ?? "–"}/10</span>
                        <span aria-hidden>·</span>
                        <time dateTime={r.submittedAt}>{new Date(r.submittedAt).toLocaleDateString()}</time>
                    </header>
                    <p style={{ marginTop: 8 }}>{r.publicReview}</p>
                    <footer style={{ fontSize: 12, color: "#666" }}>by {r.guestName}</footer>
                </article>
            ))}
        </div>
    );
};

export default PropertyReviews;