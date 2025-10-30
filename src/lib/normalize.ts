import { ReviewNormalized, ReviewCategoryScore } from "../types/review";

export function toISO(input: string | Date): string {
    try {
        const d = typeof input === "string" ? new Date(input) : input;
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();
    } catch {
        return new Date().toISOString();
    }
}

export function normalizeHostaway(r: any): ReviewNormalized {
    const categories: ReviewCategoryScore[] = (r.reviewCategory || []).map((c: any) => ({
        category: String(c.category || "other").toLowerCase(),
        score: Number(c.rating ?? c.score ?? 0),
    }));

    return {
        id: r.id ?? r.reviewId,
        listingId: r.listingId ?? r.propertyId ?? "unknown",
        listingName: r.listingName ?? r.propertyName ?? "Unknown listing",
        reviewType: (r.reviewType as any) || "guest-to-host",
        channel: (r.source as any) || "Hostaway",
        overallRating: r.rating != null ? Number(r.rating) : null,
        categories,
        guestName: r.guestName ?? r.authorName ?? "Guest",
        publicReview: r.publicReview ?? r.text ?? "",
        submittedAt: toISO(r.submittedAt ?? r.createdAt ?? r.date),
        approved: Boolean(r.approved ?? false),
    };
}