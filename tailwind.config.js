/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./views/**/*.{js,ts,jsx,tsx}"],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./views/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ["Playfair Display"],
      sans: ["'Source Sans 3'"],
    },
    extend: {
      colors: {
        "pastel-green": "#4EA295",
        "pastel-pink": "#D78F8C",
        "pastel-blue": "#8F95B7",
        "pastel-red": "#D86D77",
        "pastel-gray": "#E2D5D5",
        "pastel-purple": "#F8CEEC",
        "pastel-orange": "#FFE5D9",
        "pastel-lavender": "#E6D7F2",
        "pastel-yellow": "#FCE2C4",
      },
    },
  },
  plugins: [],
};
