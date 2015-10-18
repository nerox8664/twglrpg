var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
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

UserSchema.plugin(require(__base + 'lib/mongoCache.js'));

module.exports = mongoose.model('User', UserSchema, 'users');
