/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: 'var(--test-color)',
        },
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ':root': {
          '--test-color': '#ff0000',
        },
        // Default styles for input elements
        'input': {
          '@apply border border-gray-300 rounded px-3 py-2 my-1 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500': {}
        },
        'select': {
          '@apply border border-gray-300 rounded px-3 py-2 my-1 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500': {}
        },
        'textarea': {
          '@apply border border-gray-300 rounded px-3 py-2 my-1 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500': {}
        }
      });
    },
  ],
};
