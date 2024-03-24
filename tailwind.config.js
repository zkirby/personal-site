/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "mdx-components.tsx",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      sans: ["var(--font-typewriter)"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
