module.exports = (socket) => {
  var gameCharacterController = require(__base + 'events/controllers/character.js')(socket);
  var gameMapController = require(__base + 'events/controllers/map.js')(socket);

  socket.on('game.character.movement', gameCharacterController.movement);
  socket.on('game.map.get', gameMapController.get);

  socket.emit('game.character.create', {
    positionX: 0,
    positionY: 0,
  });
}
