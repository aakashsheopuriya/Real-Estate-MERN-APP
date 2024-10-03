/** @type {import('tailwindcss').Config} */
export const mode = "jit";
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./public/images/*.{png,jpg,gif}",
];
export const theme = {
  extend: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
};
export const plugins = [];
