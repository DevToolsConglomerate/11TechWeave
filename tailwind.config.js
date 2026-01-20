/** Tailwind config with forms plugin and dark mode utilities */
module.exports = {
  content: ['./**/*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand1: '#74CAF9',
        brand2: '#8F7FE9',
        dark: {
          DEFAULT: '#0b0b10',
          light: '#151425',
          lighter: '#1b1a2f',
          card: '#0f0e18',
          input: '#0b0b12',
          border: '#2b284b',
          hover: '#1f1e3f'
        },
        gray: {
          850: '#18172a',
          950: '#0a0a0f'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
