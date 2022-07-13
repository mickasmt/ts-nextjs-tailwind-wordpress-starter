/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),

    // install others plugins tailwind if you want. Example: "npm install -D @tailwindcss/forms"
    // require('@tailwindcss/forms'), 
    // require('@tailwindcss/line-clamp')
  ],
}