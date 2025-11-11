// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // scan all JS/JSX/TSX files
  ],
  darkMode: "class", // enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // blue-700 custom primary if needed
        secondary: "#2563EB", // blue-600
      },
    },
  },
  plugins: [],
};
