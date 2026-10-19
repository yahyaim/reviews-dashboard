import type { Review } from "../types/review";
import { categoryScore, dateOnly, effectiveRating } from "./reviews";

/**
 * Downloads reviews as an .xlsx file. SheetJS is loaded on demand so its ~400 kB
 * stays out of the initial bundle.
 */
export async function exportReviewsToExcel(
  reviews: Review[],
  isApproved: (id: Review["id"]) => boolean,
  filename: string
) {
  const XLSX = await import("xlsx");

  const rows = reviews.map((r) => ({
    ID: r.id,
    Guest: r.guestName || "",
    Listing: r.listingName || "",
    Rating: effectiveRating(r) ?? "",
    Cleanliness: categoryScore(r, "cleanliness") ?? "",
    Communication: categoryScore(r, "communication") ?? "",
    "House rules": categoryScore(r, "respect_house_rules") ?? "",
    Source: r.source ?? "Hostaway",
    Date: dateOnly(r.submittedAt),
    "On website": isApproved(r.id) ? "Yes" : "No",
    Review: r.publicReview || "",
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = [8, 24, 28, 8, 12, 14, 12, 10, 12, 11, 60].map((wch) => ({ wch }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reviews");
  XLSX.writeFile(wb, filename);
}
