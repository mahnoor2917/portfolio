/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0b1f4d",
          light: "#12306e",
          dark: "#071433",
        },
        accent: {
          DEFAULT: "#f5820b",
          light: "#ff9d33",
        },
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(245, 130, 11, 0.25)",
      },
    },
  },
  plugins: [],
};
