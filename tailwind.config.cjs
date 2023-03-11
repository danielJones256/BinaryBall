/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#C1121F",
        "custom-blue": "#669BBC",
      },
    },
  },
  plugins: [],
};
