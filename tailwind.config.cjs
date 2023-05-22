/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#558CA9",
        dark1: "#121313",
        dark2: "#1B1F2A",
        dark3: "#2a2e39",
        blurred: "rgba(18, 19, 19, 0.5)",

        textlight: "#334155",
        light1: "#fcfcfc",
        light2: "rgb(209, 213, 219)"
      }
    },
    transitionDuration: {
      DEFAULT: "300ms"
    }
  },
  plugins: [],
}
