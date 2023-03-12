/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#558CA9",
        dark1: "#121313",
        dark2: "#1B1F2A",
        dark3: "#2a2e39",
        blurred: "rgba(18, 19, 19, 0.5)"
      }
    },
    transitionDuration: {
      DEFAULT: "300ms"
    }
  },
  plugins: [],
}
