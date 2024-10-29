/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      textStrokeWidth: {
        '1': '1px',
        '2': '2px',
        '4': '4px',
      }
      ,
      animation: {
        'fade-in': 'fadeIn 1s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-stroke-1': {
          '-webkit-text-stroke-width': '1px',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke-width': '2px',
        },
        '.text-stroke-4': {
          '-webkit-text-stroke-width': '4px',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ]
}

