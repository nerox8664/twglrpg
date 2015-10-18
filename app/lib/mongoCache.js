var HashMap = require('hashmap');

module.exports = function(schema, options) {
  var cache = new HashMap();
  schema.statics.findOneInCache = function(conditions, callback) {
    if (cache.has(conditions)) {
      console.log('From cache:', cache.get(conditions));
      return callback(null, cache.get(conditions));
    };
    return this.findOne(conditions, (err, answer) => {
      cache.set(conditions, answer);
      console.log('From db:', cache.get(conditions));
      callback(err, answer);
    });
  };
}
