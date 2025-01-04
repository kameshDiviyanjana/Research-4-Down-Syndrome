/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        fontstle: ["Playwrite FR Moderne Guides", "serif"],
        fontstle2: ["Dancing Script", "serif"],
      },
    },
  },
  plugins: [],
};
