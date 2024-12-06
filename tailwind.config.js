/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      zIndex: {
        50: "50",
        60: "60",
      },
    },
  },
  plugins: [],
};
