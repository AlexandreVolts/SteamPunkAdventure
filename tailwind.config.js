module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'steam-punk': '"Steam Punk Flyer"',
    },
    boxShadow: {
      dark: "-1px 8px 20px rgba(0, 0, 0, 0.3)",
      light: "-1px 8px 15px rgba(0, 0, 0, 0.08)",
    },
    extend: {
      backgroundImage: {
        'layer2': "url('/public/assets/background/layer2.png')",
      },
    },
  },
  plugins: [],
}