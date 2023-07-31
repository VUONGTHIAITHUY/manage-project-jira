/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1C6AFE',
        'accent':'#001038',
        'gray':'#868A9A',
        'gray-100':'#d1d1d1'
      },
    },
  },
  plugins: [],
}

