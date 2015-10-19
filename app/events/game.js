module.exports = (socket) => {
  var client = {character: {},};

  client.character.chunk = [0, 0];
  client.character.positionX = 0;
  client.character.positionY = 0;

  var gameCharacterController = require(__base + 'events/controllers/character.js')(socket, client);
  var gameMapController = require(__base + 'events/controllers/map.js')(socket, client);

  socket.on('character.movement', gameCharacterController.movement);
  socket.on('map.get', gameMapController.get);

  socket.emit('character.create', {
    positionX: 0,
    positionY: 0,
  });
}
