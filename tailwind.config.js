module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#171717",
      },
      minHeight: {
        '10': '2.5rem',
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
