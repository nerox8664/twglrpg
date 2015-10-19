var HashMap = require('hashmap');

module.exports = function(schema, options) {
  var cache = new HashMap();
  schema.statics.findOneInCache = function(conditions, callback) {
    if (cache.has(conditions)) {
      return callback(null, cache.get(conditions));
    };
    return this.findOne(conditions, (err, answer) => {
      cache.set(conditions, answer);
      callback(err, answer);
    });
  };
}
