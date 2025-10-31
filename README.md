"""# 🏡 Property Management Reviews Dashboard

A modern web application that helps property managers analyze, filter, and visualize guest reviews across multiple channels such as **Hostaway** and (optionally) **Google Reviews**.  
The dashboard centralizes performance insights, highlights trends, and makes it easy to identify areas for improvement in guest experience.

---

## 🚀 Features

- **🔗 Hostaway Reviews Integration**  
  Securely fetches and normalizes review data via a serverless API.  
  Falls back to realistic mock data for sandbox environments.

- **📊 Property Performance Metrics**  
  Aggregated KPIs including total reviews, average rating, and percentage of positive reviews (≥9/10).

- **🧭 Advanced Filtering**  
  Filter reviews by rating band, category (cleanliness, communication, house rules), channel, date range, and property.

- **📈 Trends & Insights**  
  Detect recurring issues or strengths by category and visualize trends across listings.

- **💾 Export to Excel**  
  One-click export of filtered or paginated data for internal reporting and record-keeping.

- **📱 Responsive UI**  
  Clean, modern interface optimized for desktop and tablet displays.

- **🧰 Modular Architecture**  
  Fully component-based with hooks and utilities separated by concern.

---

## 🧱 Tech Stack

**Frontend**
- [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [XLSX.js](https://github.com/SheetJS/sheetjs) for Excel export functionality

**Backend / API**
- [Vercel Serverless Functions](https://vercel.com/docs/functions)  
  Used to securely fetch and proxy Hostaway review data  
  (`/api/reviews` endpoint with retry logic and response normalization)

**Data Sources**
- **Hostaway Reviews API** (primary)  
- **Google Business Profile API** (optional integration, explored)

---

## 🧩 Architecture Overview

Frontend (React + Vite)
     │
     ▼
Serverless API (/api/reviews)
     │
     ├── Calls Hostaway Reviews API
     │       ↳ Normalizes data into unified schema
     │
     └── Returns JSON to client
             ↳ Filtered, visualized, and exported in Dashboard

---

## 🧮 Review Normalization Schema

Each review returned by the API follows this unified structure:

| Field | Type | Description |
|-------|------|--------------|
| `id` | number / string | Unique review identifier |
| `rating` | number | Normalized 1–10 rating |
| `guestName` | string | Reviewer name |
| `listingName` | string | Property or listing name |
| `publicReview` | string | Review text |
| `submittedAt` | string | Review submission date |
| `reviewCategory` | array | Category ratings (cleanliness, communication, etc.) |
| `source` | string | Review channel (`Hostaway`, `Google`, etc.) |



---

## ⚙️ Environment Variables

To run the project locally, create a `.env.local` file at the root:

HOSTAWAY_TOKEN=your_hostaway_api_token
HOSTAWAY_API_BASE=https://api.hostaway.com/v1

These are used **server-side only** and never exposed to the client.

---


## 🧑‍💻 Local Development

```bash
# Install dependencies
pnpm install
# or
npm install

# Run the dev server (includes API functions)
vercel dev
# or if using plain vite for frontend only
npm run dev
Visit: http://localhost:3000

```

---

## ☁️ Deployment
- This project is optimized for Vercel:
- Serverless APIs are auto-deployed from the /api folder.
- Environment variables are configured securely in Vercel Settings.
- Static assets and client build served directly via Vercel CDN.

---
## 🌟 Future Enhancements

Planned improvements and next-phase ideas to extend the dashboard’s capabilities:

- 🔗 **Google Reviews Integration**  
  Add secure server-side integration with the Google Business Profile API to include verified guest feedback from Google.

- 💬 **Sentiment Analysis**  
  Use natural language processing (NLP) to automatically detect positive, neutral, or negative sentiment in review comments.

- 🏘️ **Multi-Property Comparison**  
  Enable managers to compare average ratings, trends, and review volumes across multiple listings in a single view.

- 🔒 **Manager Authentication**  
  Introduce role-based access control to allow property managers to log in, manage visibility, and respond to reviews.

- 📈 **Advanced Analytics Dashboard**  
  Include charts and time-series visualizations for rating trends, recurring issues, and performance over time.

---

## 🧭 Summary

The Property Management Reviews Dashboard simplifies how property managers analyze and act on guest feedback.  
By unifying data from multiple review sources into a single, interactive interface, it helps teams:

- Identify strengths and recurring issues quickly.  
- Track guest satisfaction trends in real time.  
- Export insights for reporting and performance reviews.  

Built with scalability and security in mind, the dashboard provides a reliable foundation for modern property management analytics—ready to grow as new data sources and features are added.

---

## ⚖️ License

This project is released under the **MIT License**.  
You’re free to use, modify, and distribute it with attribution.
[Maram]


