/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-amber': '#AC7121',
        'custom-green': '#065F4E',
      },
    },
  },
  plugins: [],
};
