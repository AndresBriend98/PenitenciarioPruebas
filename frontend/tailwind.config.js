/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'general': "url('/src/assets/images/backgroundGeneral.jpg')",
      },
    },
  },
  plugins: [],
}
