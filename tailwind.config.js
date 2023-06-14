/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'night': '#141418',
        'night-darker': '#0F0F11',
        'raisin-black': '#232329',
        'mslate-blue': '#6A68D8',
        'battleship-gray': '#8D8D8D',
        'eerie-black': '#252525',
        'crimson': '#D6304E'
      },
      keyframes: {
        slide : {
          '0%': {transform: ' translateX(0)'},
          '100%': {transform: 'translateX(-100%)'}
        }
      },
      animation: {
        'slide-left': 'slide 2s linear infinite'
      }
    },
  },
  plugins: [],
}

