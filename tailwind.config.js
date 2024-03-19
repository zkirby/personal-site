/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "mdx-components.tsx",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-typewriter)"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        "typewriter-paper": "#f4f0e8",
      },
    },
  },
  plugins: [],
};
