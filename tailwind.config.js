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
        'dim-gray': '#64626F',
        'eerie-black': '#252525',
        'darker-raisin': '#18171E'
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

