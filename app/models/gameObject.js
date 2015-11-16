var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameObjectSchema = Schema({
  positionX: {
    type: Number,
    required: true,
  },
  positionY: {
    type: Number,
    required: true,
  },
  class: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('GameObject', GameObjectSchema, 'gameObjects');
