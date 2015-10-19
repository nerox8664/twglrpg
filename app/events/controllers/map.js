var Chunk = require(__base + 'models/chunk.js');
var generator = require(__base + 'lib/chunkGenerator.js');

module.exports = (socket, client) => {
  return {
    get: (data) => {
      if (!data.position) {
        data.position = [0, 0];
      }
      var c = Chunk.findOneInCache({position: data.position}, (err, chunk) => {
        if (!chunk) {
          chunk = generator(data.position);
        }
        socket.emit('map.post', chunk);
      });
    },
  };
}
