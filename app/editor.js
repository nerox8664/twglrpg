var json = require(__dirname + '/../assets/data.json');
var Chunk = require(__dirname + '/models/chunk.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rpg');

var tiles = json.layers[0].data;
Chunk.remove({position: [0,0]}, function() {
  var c = new Chunk({
    tiles: tiles,
    position: [0, 0],
    image: 'tiles',
    size: [16, 16],
    tileSize: [32, 32],
  });
  c.save(function(err, chunk) {
    console.log('done');
  })
});
