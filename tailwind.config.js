/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f9fc',
          100: '#e0f2f7',
          200: '#bae6f1',
          300: '#7dd3e4',
          400: '#22c55e',
          500: '#0891b2',
          600: '#0e7490',
          700: '#155e75',
          800: '#164e63',
          900: '#0f2f3f',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        coral: {
          50: '#fff5f3',
          100: '#ffe7e1',
          200: '#ffd1c3',
          300: '#ffb5a0',
          400: '#ff987d',
          500: '#ff6b54',
          600: '#e74c3c',
          700: '#c0392b',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', '1rem'],
        sm: ['0.875rem', '1.25rem'],
        base: ['1rem', '1.5rem'],
        lg: ['1.125rem', '1.75rem'],
        xl: ['1.25rem', '1.75rem'],
        '2xl': ['1.5rem', '2rem'],
        '3xl': ['1.875rem', '2.25rem'],
        '4xl': ['2.25rem', '2.5rem'],
        '5xl': ['3rem', '1'],
        '6xl': ['3.75rem', '1'],
        '7xl': ['4.5rem', '1'],
      },
      animation: {
        'bubble-float': 'bubbleFloat 8s infinite ease-in-out',
        'ripple': 'ripple 600ms ease-out',
        'wave': 'wave 3s ease-in-out infinite',
        'float-up': 'floatUp 6s ease-in infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        bubbleFloat: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(100px)', opacity: '0' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0)', opacity: '0.3' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-100vh)', opacity: '0' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(132, 204, 22, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(132, 204, 22, 0.8)' },
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      brightness: {
        25: '.25',
        75: '.75',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'elevation-1': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'elevation-3': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'elevation-4': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(14, 116, 144, 0.5)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-out-smooth': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      aspectRatio: {
        'product': '3 / 4',
        'hero': '16 / 9',
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ addUtilities, theme }) => {
      addUtilities({
        '.contain-paint': {
          'contain': 'paint',
        },
        '.contain-layout': {
          'contain': 'layout',
        },
        '.contain-style': {
          'contain': 'style',
        },
      });
    }),
  ],
};
