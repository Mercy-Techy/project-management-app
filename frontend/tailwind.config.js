/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffc404",
        dark: "#1d1a16",
        priceColor: "#312c1d",
        buttonColor: "#1f1a09",
        blockHoverColor: "#ffab04",
        modalBg: "#e4ddd4",
      },
      maxHeight: { 128: "38rem" },
    },
  },
  plugins: [],
};
