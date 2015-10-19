var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectSchema = Schema({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  tileset: {
    type: String,
    required: true,
  },
  model: [Number],
});

module.exports = mongoose.model('ObjectClass', ObjectSchema, 'objectClasses');
