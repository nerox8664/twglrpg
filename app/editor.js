var Chunk = require(__dirname + '/models/chunk.js');
var glob = require('glob');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rpg');

glob('assets/map/*.json', function(er, files) {
  files.forEach(function(file) {
    var chunk = require('../' + file);

    var rePattern = new RegExp(/([\d]+),([\d]+)/i);
    var arrMatches = file.match(rePattern);
    var position = [arrMatches[1], arrMatches[2]];

    Chunk.remove({position: position}, function() {
      var tiles = chunk.layers[0].data;
      var c = new Chunk({
        tiles: tiles,
        position: position,
        image: 'tiles',
        size: [chunk.width, chunk.height],
        tileSize: [chunk.tilewidth, chunk.tileheight],
      });
      c.save(function(err, chunk) {
        console.log(file, 'done');
      })
    });
  })
});
