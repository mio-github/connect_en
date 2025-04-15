/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0288D1',
          light: '#B3E5FC',
          dark: '#01579B',
        },
        secondary: {
          DEFAULT: '#388E3C',
          light: '#C8E6C9',
          dark: '#1B5E20',
        },
        accent: {
          DEFAULT: '#FB8C00',
          light: '#FFE0B2',
          dark: '#E65100',
        },
      },
    },
  },
  plugins: [],
} 