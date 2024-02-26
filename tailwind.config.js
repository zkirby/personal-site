/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-typewriter)"],
    },
    extend: {
      colors: {
        "typewriter-paper": "#f4f0e8",
      },
    },
  },
  plugins: [],
};
