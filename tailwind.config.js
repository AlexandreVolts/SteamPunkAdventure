const rotateX = require("./rotate-x-plugin");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'steam-punk': '"Steam Punk Flyer"',
    },
    extend: {
      backgroundImage: {
        'layer2': "url('/public/assets/background/layer2.png')",
      },
      boxShadow: {
        'button': '-10px 10px 20px rgba(0, 0, 0, 0.3), -15px -50px 60px rgba(0, 0, 0, 0.3) inset',
      },
      animation: {
        'fade-in-delay-1': 'fade-in 1s linear 1s forwards',
        'fade-in-delay-2': 'fade-in 1s linear 1.33s forwards',
        'fade-in-delay-3': 'fade-in 1s linear 1.66s forwards',
        'bounce': 'bounce 1s infinite, fade-in 1s linear forwards',
        'dezoom': 'dezoom 1s forwards',
        'red-shine': 'red-shine 1s infinite alternate',
        'blue-shine': 'blue-shine 1s infinite alternate',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'red-shine': {
          '0%': { backgroundColor: '#7f1d1d' },
          '100%': { backgroundColor: '#b91c1c' },
        },
        'blue-shine': {
          '0%': { backgroundColor: '#1d4ed8' },
          '100%': { backgroundColor: '#1e3a8a' },
        },
        'dezoom': {
          '0%': {
            opacity: 0,
            transform: 'scale(8) rotate(180deg)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(0.9) rotate(0deg)',
          },
        },
      },
    },
  },
  plugins: [ rotateX ],
}