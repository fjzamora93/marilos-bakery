// tailwind.config.js - Paleta para Marilo's Bakery
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,js,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales de repostería
        'bakery': {
          cream: '#FDF4E3',      // Crema suave
          warm: '#F7E6D3',       // Beige cálido
          gold: '#D4A574',       // Dorado de pan
          brown: '#8B4513',      // Marrón chocolate
          deep: '#5D2A1A',       // Marrón profundo
        },
        // Colores dulces y pasteles
        'sweet': {
          pink: '#F8BBD9',       // Rosa pastel
          lavender: '#E6E6FA',   // Lavanda suave
          mint: '#E0F2E7',       // Verde menta
          peach: '#FFDAB9',      // Durazno
          vanilla: '#F5F5DC',    // Vainilla
        },
        // Colores de acento
        'accent': {
          strawberry: '#FF6B9D',  // Fresa vibrante
          chocolate: '#3C1810',   // Chocolate oscuro
          caramel: '#C8860D',     // Caramelo
          cherry: '#DC143C',      // Cereza
          honey: '#FFB74D',       // Miel
        },
        // Colores neutros cálidos
        'neutral': {
          50: '#FEFCF9',
          100: '#FDF9F3',
          200: '#F9F0E7',
          300: '#F3E4D3',
          400: '#E8D1B8',
          500: '#D4A574',
          600: '#B8935F',
          700: '#8B6F47',
          800: '#5E4A31',
          900: '#2D1F16',
        }
      },
      fontFamily: {
        'script': ['Dancing Script', 'cursive'],
        'elegant': ['Quicksand', 'sans-serif'],
        'handwriting': ['Kalam', 'cursive'],
      },
      boxShadow: {
        'warm': '0 4px 14px 0 rgba(212, 165, 116, 0.2)',
        'sweet': '0 8px 25px -5px rgba(248, 187, 217, 0.3)',
        'bakery': '0 10px 40px -10px rgba(139, 69, 19, 0.2)',
      }
    },
  },
  plugins: [],
}