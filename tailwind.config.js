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
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
    },
  },
  plugins: [ rotateX ],
}