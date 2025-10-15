/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#E9EED9',
        primary : '#B99470',
        bgquestion : '#E0F0FF',
      },

        fontFamily: {
          figtree: ['Figtree', 'sans-serif'],
          fontspringheavy: ['fontspringheavy', 'sans-serif'],
          fontspringmedium: ['fontspringmedium', 'sans-serif'],
        },

      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.23, 1, 0.32, 1)', 
        
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
      },

    },
  },
  plugins: [],
};
