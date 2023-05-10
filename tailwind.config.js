/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jet': '#313139',
        'raisin-black': '#1F1E26',
        'mslate-blue': '#6A68D8',
        'battleship-gray': '#8D8D8D',
        'dim-gray': '#64626F'
      }
    },
  },
  plugins: [],
}

