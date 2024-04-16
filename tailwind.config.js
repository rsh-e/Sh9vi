/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dark_grote: ['Darker Grotesque', 'sans-serif'],
        bric_grote: ['Bricolage Grotesque', 'sans-serif']
      }
    },
  },
  plugins: [],
}

