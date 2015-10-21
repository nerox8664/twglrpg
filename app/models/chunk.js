var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChunkSchema = Schema({
  x: Number,
  y: Number,
  image: String,
  tiles: [Number],
});

module.exports = mongoose.model('Chunk', ChunkSchema, 'chunks');
