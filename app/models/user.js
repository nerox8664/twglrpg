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

var cache = {};
UserSchema.statics.findOneInCache = (query, cb) => {
  var Model = mongoose.model('User');
  if (cache[query]) {
    return cb(null, cache[query]);
  };
  return Model.findOne(query, (err, user) => {
    cache[query] = user;
    cb(err,user);
  });
}

module.exports = mongoose.model('User', UserSchema, 'users');
