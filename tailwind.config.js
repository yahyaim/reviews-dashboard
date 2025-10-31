// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     "./index.html",
//     "./src/**/*.{ts,tsx,js,jsx}"
//   ],
//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           bg: "rgb(var(--brand-bg) / <alpha-value>)",
//           surface: "rgb(var(--brand-surface) / <alpha-value>)",
//           text: "rgb(var(--brand-text) / <alpha-value>)",
//           muted: "rgb(var(--brand-muted) / <alpha-value>)",
//           primary: "rgb(var(--brand-primary) / <alpha-value>)",
//           ring: "rgb(var(--brand-ring) / <alpha-value>)",
//           "brand-accent": "#284e4c",
//           "brand-bg": "#F5F1E8",
//           "brand-border": "#d4cfc4",
//           "brand-text": "#0f172a",
//           "brand-muted": "#6b7280",
//           "brand-surface": "#ffffff",
//         },
//       },
//       borderColor: {
//         brand: "rgb(var(--brand-ring) / <alpha-value>)",
//       },  maxWidth: {
//         container: "1200px",
//       },
//       boxShadow: {
//         card: "0 1px 2px rgba(0,0,0,0.06)",
//       },
//       borderRadius: {
//         pill: "999px",
//       },
//       spacing: {
//         "4.5": "1.125rem", // 18px  → enables w-4.5 / h-4.5
//       },
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F5F1E8",
          accent: "#284e4c",
          border: "#d4cfc4",
          text: "#0f172a",
          muted: "#6b7280",
          surface: "#ffffff",
        },
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        xl2: "1rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.06)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

