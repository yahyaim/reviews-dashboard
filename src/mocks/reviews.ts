import { Review } from "../types/review";

export const mockReviews: Review[] = [
  {
    id: 7453,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Shane and family are wonderful! Would definitely host again :)",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-08-21 22:45:14",
    guestName: "Shane Finkelstein",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    source: "Hostaway"
  },
  {
    id: 7454,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Good stay, but a bit noisy at night.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2020-09-01 15:30:10",
    guestName: "Emma Johnson",
    listingName: "3B N2 B - 12 Baker Street",
    source: "Google"
  },
  {
    id: 7455,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Perfect guests! Highly recommended.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-09-12 18:12:45",
    guestName: "Liam Smith",
    listingName: "1A N3 C - 5 Oxford Road",
    source: "Hostaway"
  }
];
