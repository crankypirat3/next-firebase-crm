/** @type {import('tailwindcss').Config} */

const primary = '#FF0000';

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        primary: primary
      },
    },
  },
  plugins: [],
}
