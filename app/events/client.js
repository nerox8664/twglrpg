module.exports = (socket, gameService) => {

  socket.on('character.online', function(data, cb) {
    cb(true);
  });

  socket.on('config.get', function(data, cb) {
    cb({
      chunkSize: config.chunkSize,
      tileSize: config.tileSize,
    });
  });

  socket.on('map.get', function(data, cb) {
    console.log(data);

    if (!data.x) {
      data.x = 0;
    }
    if (!data.y) {
      data.y = 0;
    }

    gameService
      .getChunk(data.x, data.y)
      .then(function(chunk) {
        cb(chunk);
      }, function(err) {
        // something was wrong.
      });
  });

}
