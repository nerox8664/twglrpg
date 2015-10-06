var mongoose = require('mongoose');
var HashMap = require('hashmap');
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

// TODO: improve cache as plugin.
// UserSchema.plugin(test());

var cache = new HashMap();
UserSchema.statics.findOneInCache = function(query, cb) {
  if (cache.has(query)) {
    console.log('From cache:', cache.get(query));
    return cb(null, cache.get(query));
  };
  return this.findOne(query, (err, user) => {
    cache.set(query, user);
    console.log('From db:', cache.get(query));
    cb(err,user);
  });
}

module.exports = mongoose.model('User', UserSchema, 'users');
