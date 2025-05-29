/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS/React files in src
  ],
  theme: {
    extend: {
      // Add custom colors, fonts, etc. here if needed
    },
  },
  plugins: [],
}
