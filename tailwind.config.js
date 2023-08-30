/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        '380': '380px',
        '1200': '1200px',
      },
      height: {
        '600': '600px',
        '300': '300px',
        '40': '40px',
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
