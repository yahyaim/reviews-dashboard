import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
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
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.06)",
      },
    },
  },
  plugins: [forms],
};
