/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: '#FAFAFA',
        lightCard: '#FFFFFF',
        lightCardHover: '#F5F5F7',
        lightBorder: '#E5E5E7',
        gold: {
          300: '#F5E6BA',
          400: '#E6C687',
          500: '#C5A059',
          600: '#B8860B',
          700: '#8A6405'
        },
        primaryText: '#1D1D1F',
        secondaryText: '#6E6E73',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'light-card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'light-hover': '0 12px 30px rgba(0, 0, 0, 0.08)',
        'gold-soft': '0 4px 20px rgba(184, 134, 11, 0.15)',
        'apple-light': '0 8px 30px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DFB15B 0%, #B8860B 100%)',
        'gold-text-gradient': 'linear-gradient(180deg, #1D1D1F 0%, #B8860B 100%)',
        'light-glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(250, 250, 250, 0.95) 100%)',
      }
    },
  },
  plugins: [],
}
