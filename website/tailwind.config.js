/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pomaii-green': '#163b2f',
        'pomaii-dark': '#0f2921',
        'pomaii-light': '#eef5f2',
        'pomaii-orange': '#f97316',
        'pomaii-orange-hover': '#ea580c',
        'pomaii-bg': '#fcfbf8',
        'pomaii-surface': '#f5f6f4',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Condensed"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        baskerville: ['"Libre Baskerville"', 'Georgia', 'serif'],
        raleway: ['"Raleway"', 'system-ui', 'sans-serif'],
        serif: ['"Libre Baskerville"', '"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Libre Baskerville"', '"Playfair Display"', 'Georgia', 'serif'],
        condensed: ['"IBM Plex Sans Condensed"', 'sans-serif'],
        display: ['"Bebas Neue"', 'sans-serif'],
        brush: ['"Permanent Marker"', 'cursive'],
        headline: ['"Antonio"', '"Bebas Neue"', 'sans-serif'],
        coolvetica: ['"Coolvetica"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 2px 8px -2px rgba(0, 0, 0, 0.03)',
        'card': '0 12px 36px -8px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'pill': '0 8px 24px -4px rgba(22, 59, 47, 0.12)',
      }
    },
  },
  plugins: [],
}
