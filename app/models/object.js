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
  class: [{
    type: Schema.Types.ObjectId,
    ref: 'ObjectClass',
  }],
});

module.exports = mongoose.model('Object', ObjectSchema, 'objects');
