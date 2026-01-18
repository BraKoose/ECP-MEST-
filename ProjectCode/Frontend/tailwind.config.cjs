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
        'primary': '#2bbbbb',
        'secondary': '#ffffff',
        'mest-orange': '#f4efecff',
        'mest-blue': '#2bbbbb',
        'mest-dark': '#0db6c9ff',
      }
    },
  },
  plugins: [],
}