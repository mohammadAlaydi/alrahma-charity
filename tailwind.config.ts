import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/store/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/services/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
        alexandria: ["var(--font-alexandria)", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#ECFDF8",
          100: "#D1FAEE",
          200: "#A7F3DD",
          300: "#6EE7C7",
          400: "#34D3AD",
          500: "#0AA37C",
          600: "#058563",
          700: "#056A4F",
          800: "#06553F",
          900: "#064535",
        },
        alrahma: {
          primary: "#007F5E",
          secondary: "#B4BB5F",
          dark: "#0D0D0D",
          white: "#FFFFFF",
          accent: "#DFD383",
          paragraph: "rgba(13, 13, 13, 0.7)",
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        brand: "0 0 0 1px rgba(0,0,0,0.06), 0 0 18px rgba(10,163,124,0.18)",
      },
    },
  },
  plugins: [forms, typography],
} satisfies Config;
