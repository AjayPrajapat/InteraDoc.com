import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        brand: {
          DEFAULT: '#2563EB'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top, rgba(37,99,235,0.25), transparent 60%)'
      }
    }
  },
  plugins: []
} satisfies Config;
