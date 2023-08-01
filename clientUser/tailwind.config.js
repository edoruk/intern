/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      backgroundImage: {
        building: "url(/building.jpeg)",
      },
      boxShadow: {
        left: "-8px 0px 15px rgba(0, 0, 0, .6)",
      },
    },
  },
  plugins: [],
}
