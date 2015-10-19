var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChunkSchema = Schema({
  image: String,
  tiles: [Number],
  position: [Number],
  objects: [{
    type: Schema.Types.ObjectId,
    ref: 'Object',
  }],
});

ChunkSchema.plugin(require(__base + 'lib/mongoCache.js'));

module.exports = mongoose.model('Chunk', ChunkSchema, 'chunks');
