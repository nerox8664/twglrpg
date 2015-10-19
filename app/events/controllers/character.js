
module.exports = (socket, client) => {
  return {
    movement: (data) => {
      if (data.direction == 'up') {
        client.character.positionY --;
      } else if (data.direction == 'down') {
        client.character.positionY ++;
      } else if (data.direction == 'left') {
        client.character.positionX --;
      } else if (data.direction == 'right') {
        client.character.positionX ++;
      }

      if (client.character.positionX > 64) {
        socket.emit('map.switchChunk');
      }

      console.log('move', data);
    },
  };
}
