import { Review } from "../types/review";

export const mockReviews: Review[] = [
  {
    id: 7539,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Pleasure to communicate with. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2020-01-09 19:26:02",
    guestName: "Zoe Martinez",
    listingName: "2B NE2 C - 25 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7552,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Respectful and kind. Welcome back anytime.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2020-01-25 00:23:00",
    guestName: "Penelope Hill",
    listingName: "Garden N3 B - 51 Greenwich Parkside",
    source: "Hostaway"
  },
  {
    id: 7533,
    type: "host-to-guest",
    status: "published",
    rating: 7,
    publicReview: "Respectful and kind. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-02-13 05:51:01",
    guestName: "Grace Kumar",
    listingName: "1B SE1 C - 89 Soho Corner",
    source: "Hostaway"
  },
  {
    id: 7540,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Left the place spotless. Highly recommended!",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2020-02-19 00:43:22",
    guestName: "Omar Taylor",
    listingName: "Studio N3 D - 70 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7570,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Left the place spotless. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2020-02-29 01:01:57",
    guestName: "Henry Wilson",
    listingName: "2B NE2 D - 17 Hyde Park Terrace",
    source: "Hostaway"
  },
  {
    id: 7534,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Quiet and tidy. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2020-03-18 17:58:22",
    guestName: "Jude Reddy",
    listingName: "Penthouse NW3 B - 85 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7495,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Quiet and tidy. Welcome back anytime.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-03-24 18:45:51",
    guestName: "Caleb Mukherjee",
    listingName: "Duplex N1 A - 85 King's Cross View",
    source: "Hostaway"
  },
  {
    id: 7569,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Would happily host again. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2020-03-28 13:48:56",
    guestName: "Sebastian Miller",
    listingName: "Penthouse N3 B - 7 Notting Hill Gate",
    source: "Hostaway"
  },
  {
    id: 7525,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Quiet and tidy. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-04-21 12:49:51",
    guestName: "Jude Jones",
    listingName: "3B E2 B - 98 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7523,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Quiet and tidy. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-04-25 00:22:57",
    guestName: "Harper Singh",
    listingName: "Duplex SW1 A - 59 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7515,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Pleasure to communicate with. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2020-05-04 23:53:27",
    guestName: "Omar Patel",
    listingName: "Maisonette SE1 C - 26 Chelsea Crescent",
    source: "Hostaway"
  },
  {
    id: 7526,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Smooth check-in and great communication. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2020-05-22 21:20:06",
    guestName: "Emily Brown",
    listingName: "Loft SW1 C - 58 Oxford Road",
    source: "Hostaway"
  },
  {
    id: 7538,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Smooth check-in and great communication. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2020-06-06 03:24:25",
    guestName: "Jack Thomas",
    listingName: "2B NW3 B - 11 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7546,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Smooth check-in and great communication. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-06-08 20:05:50",
    guestName: "Jackson Mehta",
    listingName: "Loft SW1 A - 76 Greenwich Parkside",
    source: "Hostaway"
  },
  {
    id: 7472,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Followed all house rules. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2020-06-30 16:49:49",
    guestName: "Eli Hill",
    listingName: "Maisonette N1 C - 10 Shoreditch Heights",
    source: "Hostaway"
  },
  {
    id: 7471,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Left the place spotless. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2020-07-01 04:10:21",
    guestName: "Fatima Ahmed",
    listingName: "Studio W1 C - 61 Notting Hill Gate",
    source: "Hostaway"
  },
  {
    id: 7467,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Pleasure to communicate with. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2020-07-01 21:56:46",
    guestName: "Mariam Jones",
    listingName: "Studio SW1 A - 68 Kensington Lane",
    source: "Hostaway"
  },
  {
    id: 7473,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Followed all house rules. Welcome back anytime.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2020-07-31 21:19:14",
    guestName: "Aiden Jones",
    listingName: "3B W1 A - 75 Kensington Lane",
    source: "Hostaway"
  },
  {
    id: 7500,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Fantastic guest. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-08-02 05:47:12",
    guestName: "John Young",
    listingName: "Penthouse N1 D - 65 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7470,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Left the place spotless. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2020-08-22 05:06:17",
    guestName: "Julian Reddy",
    listingName: "1B N1 A - 14 Primrose Hill Rise",
    source: "Hostaway"
  },
  {
    id: 7564,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Would happily host again. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2020-08-27 17:50:45",
    guestName: "Lily Miller",
    listingName: "Maisonette NE2 A - 87 Camden Mews",
    source: "Hostaway"
  },
  {
    id: 7514,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Quiet and tidy. Took good care of the apartment.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-09-06 22:10:45",
    guestName: "Aiden Williams",
    listingName: "Garden SW1 C - 6 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7492,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Easy to host. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-09-07 08:18:20",
    guestName: "Benjamin Martinez",
    listingName: "3B W1 B - 93 Kensington Lane",
    source: "Hostaway"
  },
  {
    id: 7455,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Quiet and tidy. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2020-11-13 13:21:02",
    guestName: "Logan Ahmed",
    listingName: "1B SW1 C - 80 Notting Hill Gate",
    source: "Hostaway"
  },
  {
    id: 7480,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Fantastic guest. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2020-11-15 08:50:52",
    guestName: "Sara Green",
    listingName: "Maisonette W1 B - 33 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7462,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Followed all house rules. Took good care of the apartment.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-12-21 21:35:48",
    guestName: "Neha Kumar",
    listingName: "Loft SW1 A - 40 King's Cross View",
    source: "Hostaway"
  },
  {
    id: 7547,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Punctual and friendly. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2020-12-22 22:28:11",
    guestName: "Zoe Das",
    listingName: "3B W1 A - 80 Primrose Hill Rise",
    source: "Hostaway"
  },
  {
    id: 7517,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Fantastic guest. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2020-12-26 03:44:27",
    guestName: "Nora Singh",
    listingName: "Studio NE2 D - 55 Shoreditch Heights",
    source: "Hostaway"
  },
  {
    id: 7507,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Would happily host again. Welcome back anytime.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2021-01-28 06:42:34",
    guestName: "Zoe Williams",
    listingName: "Studio NE2 C - 92 Oxford Road",
    source: "Hostaway"
  },
  {
    id: 7490,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Punctual and friendly. Highly recommended!",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2021-02-18 06:29:02",
    guestName: "Aurora King",
    listingName: "Maisonette NE2 C - 99 Primrose Hill Rise",
    source: "Hostaway"
  },
  {
    id: 7567,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Followed all house rules. Thank you for staying with us.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2021-03-05 23:44:32",
    guestName: "Henry Brown",
    listingName: "Townhouse SW1 A - 94 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7568,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Easy to host. Everything went as agreed.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2021-04-02 19:06:42",
    guestName: "Scarlett Garcia",
    listingName: "3B SE1 C - 6 King's Cross View",
    source: "Hostaway"
  },
  {
    id: 7488,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Smooth check-in and great communication. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2021-04-02 19:30:28",
    guestName: "Noah Williams",
    listingName: "3B SE1 A - 61 King's Cross View",
    source: "Hostaway"
  },
  {
    id: 7479,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Quiet and tidy. Thank you for staying with us.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2021-04-08 02:17:35",
    guestName: "Luna Williams",
    listingName: "Penthouse NW3 B - 58 Oxford Road",
    source: "Hostaway"
  },
  {
    id: 7509,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Smooth check-in and great communication. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2021-04-08 12:58:40",
    guestName: "Ryan Martin",
    listingName: "1B E1 A - 74 Hyde Park Terrace",
    source: "Hostaway"
  },
  {
    id: 7528,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Easy to host. Highly recommended!",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2021-05-05 19:30:59",
    guestName: "Mason Al-Farsi",
    listingName: "Penthouse NW3 C - 84 King's Cross View",
    source: "Hostaway"
  },
  {
    id: 7465,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Followed all house rules. Welcome back anytime.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2021-05-28 00:45:30",
    guestName: "Grace Gupta",
    listingName: "Duplex W1 B - 72 Hyde Park Terrace",
    source: "Hostaway"
  },
  {
    id: 7511,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Respectful and kind. Took good care of the apartment.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2021-06-24 00:28:39",
    guestName: "Dylan Jones",
    listingName: "2B N1 D - 60 Soho Corner",
    source: "Hostaway"
  },
  {
    id: 7506,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Respectful and kind. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2021-07-29 05:46:23",
    guestName: "Yusuf Wilson",
    listingName: "Townhouse E2 C - 15 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7522,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Would happily host again. Thank you for staying with us.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2021-08-09 02:56:25",
    guestName: "Diya Thomas",
    listingName: "Duplex W1 B - 55 Shoreditch Heights",
    source: "Hostaway"
  },
  {
    id: 7556,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Would happily host again. Welcome back anytime.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2021-09-04 21:39:06",
    guestName: "Omar Mehta",
    listingName: "2B N2 B - 83 Canary Wharf Quay",
    source: "Hostaway"
  },
  {
    id: 7499,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Easy to host. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2021-09-08 04:32:24",
    guestName: "Mason Mukherjee",
    listingName: "3B N2 C - 90 Chelsea Crescent",
    source: "Hostaway"
  },
  {
    id: 7459,
    type: "host-to-guest",
    status: "published",
    rating: 7,
    publicReview: "Respectful and kind. Highly recommended!",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2021-10-17 12:01:14",
    guestName: "Ryan Torres",
    listingName: "Penthouse E1 D - 53 Primrose Hill Rise",
    source: "Hostaway"
  },
  {
    id: 7487,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Pleasure to communicate with. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2021-10-25 22:43:53",
    guestName: "Riley Patel",
    listingName: "2B N2 C - 68 Marylebone Row",
    source: "Hostaway"
  },
  {
    id: 7555,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Followed all house rules. Everything went as agreed.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2021-11-19 09:36:36",
    guestName: "Jack Green",
    listingName: "2B N2 A - 70 Greenwich Parkside",
    source: "Hostaway"
  },
  {
    id: 7566,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Pleasure to communicate with. Took good care of the apartment.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2022-01-13 01:41:44",
    guestName: "Aria Patel",
    listingName: "3B SW1 D - 62 Hyde Park Terrace",
    source: "Hostaway"
  },
  {
    id: 7572,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Left the place spotless. Took good care of the apartment.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2022-01-17 09:46:11",
    guestName: "Salma Youssef",
    listingName: "2B N2 C - 11 Greenwich Parkside",
    source: "Hostaway"
  },
  {
    id: 7458,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Smooth check-in and great communication. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2022-01-30 14:25:32",
    guestName: "Abdullah Al-Mazroui",
    listingName: "Garden E2 B - 90 Camden Mews",
    source: "Hostaway"
  },
  {
    id: 7484,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Pleasure to communicate with. Thank you for staying with us.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2022-03-02 09:29:12",
    guestName: "Elijah Torres",
    listingName: "Garden N1 B - 49 King's Cross View",
    source: "Hostaway"
  },
  {
    id: 7498,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Punctual and friendly. Everything went as agreed.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2022-03-07 02:54:53",
    guestName: "Huda Hernandez",
    listingName: "Duplex NW3 A - 23 Notting Hill Gate",
    source: "Hostaway"
  },
  {
    id: 7518,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Pleasure to communicate with. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2022-04-09 17:09:23",
    guestName: "Dylan Rodriguez",
    listingName: "Loft SE1 D - 18 Shoreditch Heights",
    source: "Hostaway"
  },
  {
    id: 7521,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Left the place spotless. Everything went as agreed.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2022-04-10 01:50:14",
    guestName: "Emma Jackson",
    listingName: "Loft NW3 D - 22 Canary Wharf Quay",
    source: "Hostaway"
  },
  {
    id: 7477,
    type: "host-to-guest",
    status: "published",
    rating: 7,
    publicReview: "Easy to host. Everything went as agreed.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2022-04-26 03:45:17",
    guestName: "Jackson Mehta",
    listingName: "3B SW1 B - 90 Marylebone Row",
    source: "Hostaway"
  },
  {
    id: 7532,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Respectful and kind. Welcome back anytime.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2022-04-26 17:06:43",
    guestName: "Fatima Taylor",
    listingName: "Townhouse E2 C - 17 Canary Wharf Quay",
    source: "Hostaway"
  },
  {
    id: 7478,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Punctual and friendly. Took good care of the apartment.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2022-05-09 14:46:23",
    guestName: "Elijah Smith",
    listingName: "Penthouse N3 C - 23 Soho Corner",
    source: "Hostaway"
  },
  {
    id: 7456,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Punctual and friendly. Thank you for staying with us.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2022-06-29 20:57:24",
    guestName: "Arjun Chopra",
    listingName: "Penthouse NW3 B - 93 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7510,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Pleasure to communicate with. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2022-07-12 20:15:22",
    guestName: "Reem Hamad",
    listingName: "Loft NW3 A - 81 Soho Corner",
    source: "Hostaway"
  },
  {
    id: 7463,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Easy to host. Thank you for staying with us.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2022-07-16 05:39:22",
    guestName: "Anya Singh",
    listingName: "Duplex E1 B - 50 Hyde Park Terrace",
    source: "Hostaway"
  },
  {
    id: 7485,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Would happily host again. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2022-07-22 01:39:05",
    guestName: "John Martin",
    listingName: "Garden SW1 D - 92 Notting Hill Gate",
    source: "Hostaway"
  },
  {
    id: 7535,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Easy to host. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2022-08-03 15:04:04",
    guestName: "Penelope Davis",
    listingName: "1B E1 B - 52 Canary Wharf Quay",
    source: "Hostaway"
  },
  {
    id: 7513,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Left the place spotless. Took good care of the apartment.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2022-08-13 17:11:56",
    guestName: "Aiden Hill",
    listingName: "Duplex E2 D - 18 Canary Wharf Quay",
    source: "Hostaway"
  },
  {
    id: 7558,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Easy to host. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2022-08-22 09:41:12",
    guestName: "Aurora Al-Farsi",
    listingName: "Studio N1 C - 39 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7544,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Followed all house rules. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2022-11-19 00:34:22",
    guestName: "David Ibrahim",
    listingName: "Garden N2 C - 57 Camden Mews",
    source: "Hostaway"
  },
  {
    id: 7548,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Easy to host. Highly recommended!",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2022-11-21 19:09:47",
    guestName: "Muhammad Smith",
    listingName: "2B N3 D - 11 Oxford Road",
    source: "Hostaway"
  },
  {
    id: 7549,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Smooth check-in and great communication. Thank you for staying with us.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2022-11-25 03:02:49",
    guestName: "Abdullah Mohamed",
    listingName: "Loft SW1 A - 9 Oxford Road",
    source: "Hostaway"
  },
  {
    id: 7464,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Fantastic guest. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2023-02-01 17:48:27",
    guestName: "Aria Thomas",
    listingName: "Studio E1 A - 13 Soho Corner",
    source: "Hostaway"
  },
  {
    id: 7537,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Punctual and friendly. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2023-02-15 06:28:46",
    guestName: "Luna Young",
    listingName: "Penthouse N1 D - 38 Kensington Lane",
    source: "Hostaway"
  },
  {
    id: 7529,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Easy to host. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2023-03-30 20:34:58",
    guestName: "Salma Khan",
    listingName: "Duplex E2 C - 5 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7527,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Pleasure to communicate with. Welcome back anytime.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2023-04-03 12:34:13",
    guestName: "Jude Wright",
    listingName: "3B SE1 B - 32 Canary Wharf Quay",
    source: "Hostaway"
  },
  {
    id: 7519,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Respectful and kind. Welcome back anytime.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2023-06-21 13:59:27",
    guestName: "Logan Anderson",
    listingName: "1B SE1 A - 85 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7536,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Followed all house rules. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2023-07-13 00:01:57",
    guestName: "Priya Miller",
    listingName: "Townhouse NW3 D - 38 Shoreditch Heights",
    source: "Hostaway"
  },
  {
    id: 7493,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Would happily host again. Thank you for staying with us.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2023-07-29 08:10:17",
    guestName: "Yara Green",
    listingName: "Duplex N1 D - 64 Shoreditch Heights",
    source: "Hostaway"
  },
  {
    id: 7505,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Pleasure to communicate with. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2023-08-14 23:51:49",
    guestName: "Dylan Hassan",
    listingName: "Penthouse SE1 C - 42 Notting Hill Gate",
    source: "Hostaway"
  },
  {
    id: 7545,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Left the place spotless. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2023-09-03 19:02:50",
    guestName: "Charlotte Hill",
    listingName: "Penthouse N3 A - 78 Greenwich Parkside",
    source: "Hostaway"
  },
  {
    id: 7553,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Followed all house rules. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2023-09-17 06:53:27",
    guestName: "Olivia Al-Mazroui",
    listingName: "1B SW1 D - 76 King's Cross View",
    source: "Hostaway"
  },
  {
    id: 7508,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Smooth check-in and great communication. Highly recommended!",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2023-09-30 11:44:03",
    guestName: "Sofia Lopez",
    listingName: "Studio E2 D - 17 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7531,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Left the place spotless. Everything went as agreed.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2023-10-01 14:09:35",
    guestName: "Ava Mukherjee",
    listingName: "Penthouse N3 A - 40 Camden Mews",
    source: "Hostaway"
  },
  {
    id: 7542,
    type: "host-to-guest",
    status: "published",
    rating: 7,
    publicReview: "Punctual and friendly. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2023-10-10 02:24:16",
    guestName: "Mason Garcia",
    listingName: "Penthouse NW3 B - 11 Oxford Road",
    source: "Hostaway"
  },
  {
    id: 7457,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Easy to host. Everything went as agreed.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2023-11-09 16:43:21",
    guestName: "Anya Mohamed",
    listingName: "2B SW1 C - 29 Marylebone Row",
    source: "Hostaway"
  },
  {
    id: 7512,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Fantastic guest. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2023-11-11 15:01:46",
    guestName: "Mason Wright",
    listingName: "3B E2 B - 57 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7496,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Left the place spotless. Highly recommended!",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2023-11-13 16:50:21",
    guestName: "Emily Hassan",
    listingName: "Garden E2 D - 35 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7571,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Smooth check-in and great communication. Highly recommended!",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2023-11-21 04:51:43",
    guestName: "Isabella Davis",
    listingName: "Townhouse NW3 A - 83 Greenwich Parkside",
    source: "Hostaway"
  },
  {
    id: 7502,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Would happily host again. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2023-12-14 19:10:29",
    guestName: "Ryan Chopra",
    listingName: "Garden SW1 A - 66 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7524,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Fantastic guest. Welcome back anytime.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2023-12-29 15:45:23",
    guestName: "Grace Hassan",
    listingName: "Duplex W1 A - 45 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7520,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Easy to host. Thank you for staying with us.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-01-07 03:15:32",
    guestName: "Chloe Al-Mazroui",
    listingName: "Maisonette N3 D - 27 Primrose Hill Rise",
    source: "Hostaway"
  },
  {
    id: 7468,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Respectful and kind. Thank you for staying with us.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2024-01-08 12:54:23",
    guestName: "Chloe Patel",
    listingName: "Garden E1 A - 15 Marylebone Row",
    source: "Hostaway"
  },
  {
    id: 7491,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Followed all house rules. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-01-14 18:17:28",
    guestName: "Hazel Taylor",
    listingName: "3B E2 D - 83 Kensington Lane",
    source: "Hostaway"
  },
  {
    id: 7550,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Fantastic guest. Everything went as agreed.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2024-02-17 21:33:41",
    guestName: "Jana Al-Farsi",
    listingName: "Garden E2 B - 99 Greenwich Parkside",
    source: "Hostaway"
  },
  {
    id: 7504,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Followed all house rules. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-03-04 22:17:28",
    guestName: "Hazel Johnson",
    listingName: "1B E2 B - 54 Soho Corner",
    source: "Hostaway"
  },
  {
    id: 7530,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Fantastic guest. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-03-23 06:40:15",
    guestName: "Jackson Green",
    listingName: "3B NW3 C - 31 Marylebone Row",
    source: "Hostaway"
  },
  {
    id: 7541,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Punctual and friendly. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-04-14 08:56:09",
    guestName: "Hassan Chopra",
    listingName: "Studio NE2 C - 61 Marylebone Row",
    source: "Hostaway"
  },
  {
    id: 7466,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Easy to host. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-05-27 01:15:07",
    guestName: "Hazel Davis",
    listingName: "3B E1 A - 46 Shoreditch Heights",
    source: "Hostaway"
  },
  {
    id: 7474,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Pleasure to communicate with. Everything went as agreed.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-06-12 05:30:17",
    guestName: "Sebastian Taylor",
    listingName: "3B SW1 B - 36 King's Cross View",
    source: "Hostaway"
  },
  {
    id: 7551,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Smooth check-in and great communication. Took good care of the apartment.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-06-25 03:03:17",
    guestName: "Isha Martin",
    listingName: "Studio E1 D - 79 Shoreditch Heights",
    source: "Hostaway"
  },
  {
    id: 7543,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Pleasure to communicate with. Thank you for staying with us.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-07-06 09:11:06",
    guestName: "Lily Al-Mazroui",
    listingName: "Maisonette NW3 D - 15 Hyde Park Terrace",
    source: "Hostaway"
  },
  {
    id: 7460,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Left the place spotless. Took good care of the apartment.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2024-08-01 13:03:34",
    guestName: "Grace Hill",
    listingName: "Duplex W1 D - 49 Kensington Lane",
    source: "Hostaway"
  },
  {
    id: 7476,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Smooth check-in and great communication. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2024-08-14 17:16:00",
    guestName: "Samuel Chopra",
    listingName: "Maisonette N1 C - 87 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7559,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Pleasure to communicate with. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-09-18 04:49:26",
    guestName: "Elijah Al-Farsi",
    listingName: "Duplex E1 C - 80 Canary Wharf Quay",
    source: "Hostaway"
  },
  {
    id: 7486,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Quiet and tidy. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-11-03 03:33:49",
    guestName: "Samuel Ibrahim",
    listingName: "Maisonette N1 C - 39 Kensington Lane",
    source: "Hostaway"
  },
  {
    id: 7483,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Followed all house rules. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2024-12-08 19:54:29",
    guestName: "Grace Williams",
    listingName: "1B NW3 D - 47 Soho Corner",
    source: "Hostaway"
  },
  {
    id: 7561,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Would happily host again. Took good care of the apartment.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2025-01-31 13:36:05",
    guestName: "Sophia Allen",
    listingName: "Penthouse N2 C - 15 Greenwich Parkside",
    source: "Hostaway"
  },
  {
    id: 7494,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Quiet and tidy. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2025-02-17 05:46:23",
    guestName: "Hassan Shah",
    listingName: "3B E2 D - 65 Shoreditch Heights",
    source: "Hostaway"
  },
  {
    id: 7554,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Easy to host. Everything went as agreed.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2025-04-04 10:45:36",
    guestName: "David Scott",
    listingName: "Penthouse N2 D - 16 Kensington Lane",
    source: "Hostaway"
  },
  {
    id: 7475,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Easy to host. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2025-04-13 20:59:26",
    guestName: "Ryan Miller",
    listingName: "1B NE2 B - 67 Notting Hill Gate",
    source: "Hostaway"
  },
  {
    id: 7557,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Pleasure to communicate with. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2025-04-24 07:43:08",
    guestName: "Emily Allen",
    listingName: "Penthouse N3 D - 11 Canary Wharf Quay",
    source: "Hostaway"
  },
  {
    id: 7461,
    type: "host-to-guest",
    status: "published",
    rating: 7,
    publicReview: "Followed all house rules. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2025-05-03 09:46:04",
    guestName: "Abdullah Wright",
    listingName: "Garden NW3 A - 52 King's Cross View",
    source: "Hostaway"
  },
  {
    id: 7560,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Punctual and friendly. Everything went as agreed.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2025-06-30 10:43:40",
    guestName: "Omar Williams",
    listingName: "3B SE1 D - 70 Greenwich Parkside",
    source: "Hostaway"
  },
  {
    id: 7469,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Quiet and tidy. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2025-06-30 14:39:16",
    guestName: "Charlotte Brown",
    listingName: "Garden SW1 A - 34 Kensington Lane",
    source: "Hostaway"
  },
  {
    id: 7501,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Punctual and friendly. Welcome back anytime.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2025-07-13 21:37:13",
    guestName: "Michael Chopra",
    listingName: "Maisonette SE1 D - 58 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7497,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Followed all house rules. Highly recommended!",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2025-07-17 22:20:58",
    guestName: "Elijah Flores",
    listingName: "Studio E1 B - 5 Chelsea Crescent",
    source: "Hostaway"
  },
  {
    id: 7489,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Respectful and kind. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2025-07-31 07:13:50",
    guestName: "Dev Smith",
    listingName: "1B W1 B - 25 Hyde Park Terrace",
    source: "Hostaway"
  },
  {
    id: 7482,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Punctual and friendly. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2025-08-12 15:38:29",
    guestName: "Yusuf Ibrahim",
    listingName: "Penthouse E2 A - 38 Camden Mews",
    source: "Hostaway"
  },
  {
    id: 7562,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Easy to host. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2025-08-23 18:30:18",
    guestName: "Evelyn Khan",
    listingName: "Loft W1 B - 79 Soho Corner",
    source: "Hostaway"
  },
  {
    id: 7481,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Quiet and tidy. Highly recommended!",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2025-09-12 07:53:45",
    guestName: "Chloe Moore",
    listingName: "2B N2 D - 7 Mayfair Court",
    source: "Hostaway"
  },
  {
    id: 7516,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Smooth check-in and great communication. No issues whatsoever.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2025-09-13 00:46:35",
    guestName: "Ethan Hernandez",
    listingName: "Penthouse W1 D - 39 Marylebone Row",
    source: "Hostaway"
  },
  {
    id: 7453,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Easy to host. Five-star experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 7 }
    ],
    submittedAt: "2025-10-03 10:22:14",
    guestName: "Luna Garcia",
    listingName: "Duplex W1 A - 6 Baker Street",
    source: "Hostaway"
  },
  {
    id: 7565,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Left the place spotless. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 8 }
    ],
    submittedAt: "2025-11-22 14:18:55",
    guestName: "Jude Hernandez",
    listingName: "Townhouse N1 D - 49 Marylebone Row",
    source: "Hostaway"
  },
  {
    id: 7503,
    type: "host-to-guest",
    status: "published",
    rating: 9,
    publicReview: "Respectful and kind. Very considerate.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2025-12-18 12:02:59",
    guestName: "Zoe Reddy",
    listingName: "Studio NE2 B - 13 Kensington Lane",
    source: "Hostaway"
  },
  {
    id: 7454,
    type: "host-to-guest",
    status: "published",
    rating: 10,
    publicReview: "Pleasure to communicate with. Highly recommended!",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2025-12-18 22:34:48",
    guestName: "Luna Youssef",
    listingName: "3B SE1 C - 3 Hyde Park Terrace",
    source: "Hostaway"
  },
  {
    id: 7563,
    type: "host-to-guest",
    status: "published",
    rating: 8,
    publicReview: "Followed all house rules. Seamless stay from start to finish.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2025-12-23 14:52:05",
    guestName: "Neha Gupta",
    listingName: "1B W1 C - 5 Camden Mews",
    source: "Hostaway"
  }
];
