/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'instrument-serif': ['var(--font-instrument-serif)'],
        'inter': ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}