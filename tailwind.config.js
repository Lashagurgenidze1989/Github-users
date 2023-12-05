/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        1: `0px 16px 30px -10px rgba(70, 96, 187, 0.20)`,
      },
    },
  },
  plugins: [],
};
