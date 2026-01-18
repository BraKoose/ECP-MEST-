// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mest-orange': '#f4efecff',
        'mest-blue': '#28bbbb',
        'mest-dark': '#0db6c9ff',
      }
    },
  },
  plugins: [],
}