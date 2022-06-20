module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'color-7': '#000000',
        'color-6': '#0C0C0C',
        'color-5': '#141414',
        'color-4': '#CACACA',
        'color-3': '#F0F0F0',
        'color-2': '#F5F5F5',
        'color-1': '#FFFFFF',

        'dark-gray-1': '#CDCFD2',
        'dark-gray-2': '#D8DBDE',
        'neutral-gray-3': '#E4E6E9',
        'neutral-gray-2': '#EFF2F5',
        'neutral-gray-1': '#F2F5F7',
        'light-gray-2': '#F5F7F9',
        'light-gray-1': '#F5F7F9',

        'dark-blue-1': '#152560',
        'dark-blue-2': '#20378F',
        'neutral-blue-3': '#3358E3',
        'neutral-blue-2': '#3861FB',
        'neutral-blue-1': '#4169FB',
        'light-blue-2': '#5478FC',
        'light-blue-1': '#6787FC',

        'dark-green-1': '#095539',
        'dark-green-2': '#0D724B',
        'neutral-green-3': '#14B477',
        'neutral-green-2': '#16C784',
        'neutral-green-1': '#21CA8A',
        'light-green-2': '#37CF96',
        'light-green-1': '#4DD4A1',

        'dark-red-1': '#64181D',
        'dark-red-2': '#862126',
        'neutral-red-3': '#D4343D',
        'neutral-red-2': '#EA3943',
        'neutral-red-1': '#EB424C',
        'light-red-2': '#ED555E',
        'light-red-1': '#EF6870',
      },
      minHeight: {
        '10': '2.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
