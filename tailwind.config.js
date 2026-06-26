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
        times: ['"Times New Roman"', 'Times', 'serif'],
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
        // Fresh & bright accent family — sky blue, lime, sunny yellow, coral.
        sky: {
          50: '#eef7fd',
          100: '#d8edfa',
          200: '#aedcf5',
          300: '#7cc4ec',
          400: '#3da8e0',
          500: '#2b93cf',
          600: '#1f76ab',
          700: '#1b5f88',
        },
        lime: {
          50: '#f3fbe9',
          100: '#e3f6cf',
          200: '#c8ec9f',
          300: '#a6dd6a',
          400: '#7ac74f',
          500: '#5fae37',
          600: '#4a8b2b',
          700: '#3c6e25',
        },
        sunny: {
          50: '#fff8e6',
          100: '#ffefc2',
          200: '#ffe08a',
          300: '#ffd152',
          400: '#ffc93c',
          500: '#f5b300',
          600: '#cc9100',
        },
        coral: {
          50: '#fff1ee',
          100: '#ffded6',
          200: '#ffc0b1',
          300: '#ff9c86',
          400: '#ff7a66',
          500: '#f65a42',
          600: '#d8402a',
          700: '#b1311f',
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
      // Smoother global motion: every `transition-*` utility (hovers, nav pills,
      // cards, buttons) inherits this ease-out curve unless it sets its own.
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.22, 1, 0.36, 1)',
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
        spring: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      },
      transitionDuration: {
        DEFAULT: '250ms',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
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
