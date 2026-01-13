/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        neon: {
          50: '#fdf2ff',
          100: '#fbe4ff',
          200: '#f6c7ff',
          300: '#f199ff',
          400: '#e75eff',
          500: '#d12eff',
          600: '#b411f1',
          700: '#950dc7',
          800: '#7b0e9f',
          900: '#661180',
          950: '#430057',
        },
        cyber: {
          50: '#f4ffe5',
          100: '#e6ffc7',
          200: '#cfff92',
          300: '#afff52',
          400: '#8eff1a',
          500: '#afff00',
          600: '#56cc00',
          700: '#429c00',
          800: '#387a06',
          900: '#31670b',
          950: '#173a00',
        },
      },
    },
  },
  plugins: [],
}
