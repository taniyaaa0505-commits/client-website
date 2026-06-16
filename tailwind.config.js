/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        body: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      colors: {
        page: '#edeae4',
        sage: {
          50: '#f3f7f4',
          100: '#e5efe8',
          200: '#c9dccf',
          300: '#a8c4b0',
          400: '#7fa892',
          500: '#5f8f74',
          600: '#4a735c',
          700: '#3d5e4c',
          800: '#334d40',
          900: '#2b4036',
        },
        mist: {
          50: '#f2f6f8',
          100: '#e4ecf1',
          200: '#c8d9e4',
          300: '#9eb8c8',
          400: '#6b8fa8',
          500: '#547690',
        },
        sand: {
          50: '#f9f6f1',
          100: '#f2ebe1',
          200: '#e8ddd0',
          300: '#d4c4ad',
          400: '#c4a882',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#3a3836',
          900: '#2e2c2a',
        },
        accent: {
          DEFAULT: '#5f8f74',
          light: '#a8c4b0',
          dark: '#4a735c',
        },
      },
      letterSpacing: {
        widest: '0.12em',
      },
      maxWidth: {
        site: '72rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
