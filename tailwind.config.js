// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,js,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': {
          DEFAULT: '#22C55E', // green-500
          hover: '#16A34A',  // green-600
          darker: '#15803D', // green-700
          lighter: '#abe0beff', // green-700

        },
        'secondary-color': {
          DEFAULT: '#2522c5ff', 
          hover: '#4b5d9bff',  
          darker: '#0d172bff', 
          lighter: '#8db1e0ff', 

        },
        'accent-red': {
          DEFAULT: '#EF4444', // red-500
          hover: '#DC2626',  // red-600
          darker: '#B91C1C', // red-700
          lighter: '#eb9595ff', 

        },
        // Define tus otros colores de gradiente aquí
      },
      // Puedes extender otros aspectos del tema como spacing, fontSize, etc.
    },
  },
  plugins: [],
}