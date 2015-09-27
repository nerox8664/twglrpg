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

module.exports = mongoose.model('Character', CharacterSchema, 'characters');