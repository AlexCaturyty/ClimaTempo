/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'ceu': "url('/assets/ceu.avif')"

      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      backgroundColor: {
        'bg': 'rgb(155, 222, 245)',
      },
    }
  },
  plugins: [],
}