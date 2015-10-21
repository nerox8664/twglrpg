var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectSchema = Schema({
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

module.exports = mongoose.model('Object', ObjectSchema, 'objects');
