var Character = require(__base + 'models/character.js');

module.exports = (socket) => {
  return {
    movement: (data) => {
      if (Math.abs(data.dx) > 64 || Math.abs(data.dy) > 64) {
      } else {
      }
    },
  };
}
