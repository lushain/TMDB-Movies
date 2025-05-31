/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add the app directory to the content array:
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // <-- add this line
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014", // Example color
        secondary: "#151312", // Example color
        light: {
          100: '#D6C6FF',
          200: '#A8B5DB',
          300: '#9CA4AB',
        },
        dark: {
          100: '#221F3D',
          200: '#0f0d23',
        },
        accent: "#AB8BFF", // Example color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
}