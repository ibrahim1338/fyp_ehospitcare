/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      boxShadow: {
        'bottom-only': '0 5px 2px -5px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}