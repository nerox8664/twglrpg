var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    select: false,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
  },
  nickname: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  characters: [{
    type: Schema.Types.ObjectId,
    ref: 'Object',
  }],
});

module.exports = mongoose.model('User', UserSchema, 'users');
