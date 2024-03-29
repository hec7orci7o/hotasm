/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-900': '#202123',
        'gray-800': '#343541',
        'gray-700': '#2d333a',
        'emerald': '#10a37f',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
