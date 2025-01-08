/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        greenEduard: "#0e7736", // Agrega tu color hexadecimal personalizado aquí
      },
    },
  },
  plugins: [],
};
