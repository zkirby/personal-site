/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pastel-green": "#B5EAD7",
        "pastel-pink": "#F7CAC9",
        "pastel-blue": "#C7CEEA",
        "pastel-red": "#F5D7DC",
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
