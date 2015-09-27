var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  characters: [{
    type: Schema.Types.ObjectId,
    ref: 'Character',
  }],
});

module.exports = mongoose.model('User', UserSchema, 'users');