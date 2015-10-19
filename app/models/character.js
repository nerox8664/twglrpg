var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CharacterSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  currentChunk: {
    type: Schema.Types.ObjectId,
    ref: 'Chunk',
    required: true,
  },
  positionX: {
    type: Number,
    required: true,
  },
  positionY: {
    type: Number,
    required: true,
  },
});

CharacterSchema.plugin(require(__base + 'lib/mongoCache.js'));

module.exports = mongoose.model('Character', CharacterSchema, 'characters');
