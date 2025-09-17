/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-amber': '#C3121F',
        'custom-green': '#065F4E',
      },
    },
  },
  plugins: [],
};
