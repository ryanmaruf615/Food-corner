/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "6xl": "1592px", // Custom larger screen
        "5xl": "1208px", // Custom larger screen
        "4xl": "800px", // Custom larger screen
      },
    },
  },
  plugins: [require("daisyui")],
};
