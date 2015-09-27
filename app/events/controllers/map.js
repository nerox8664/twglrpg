var Chunk = require(__base + 'models/chunk.js');

module.exports = (socket) => {
  return {
    get: (data = {}) => {
      if (!data.position) {
        data.position = [0, 0];
      }

      var c = Chunk.findOne({position: data.position}, (chunk) => {
        if (chunk) {
          socket.emit('game.map.post', chunk);
        } else {
          var tiles = new Array(64 * 64);
          for (var i = 0; i < 64 * 64; i++) {
            tiles[i] = Math.floor(Math.random() * 100);
          }
          var c = new Chunk({
            tiles: tiles,
            position: [0, 0],
            image: 'tiles',
            size: [64, 64],
            tileSize: [16, 16],
          });
          c.save((err, chunk) => {
            socket.emit('game.map.post', chunk);
          })
        }
      });
    },
  };
}
