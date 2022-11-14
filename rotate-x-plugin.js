const plugin = require('tailwindcss/plugin');

const rotateX = plugin(({ addUtilities }) => {
  addUtilities({
    '.rotate-x-40': {
      transform: 'rotateX(40deg)',
    },
    '.rotate-x-60': {
      transform: 'rotateX(60deg)',
    },
  });
});

module.exports = rotateX;