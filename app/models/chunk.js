var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChunkSchema = Schema({
  image: String,
  tiles: [Number],
  position: [Number],
  size: [Number],
  tileSize: [Number],
});

module.exports = mongoose.model('Chunk', ChunkSchema, 'chunks');