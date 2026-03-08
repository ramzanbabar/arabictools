import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B4FCC",
          dark:    "#1540A8",
          light:   "#2563EB",
        },
        accent: {
          DEFAULT: "#F59E0B",
          dark:    "#D97706",
        },
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
