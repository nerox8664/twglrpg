// TODO: Rewrite lib as mongoose plugin.

module.exports = (Schema) => {
  var cache = new HashMap();
  Schema.statics.findOneInCache = function(query, cb) {
    if (cache.has(query)) {
      console.log('From cache:', cache.get(query));
      return cb(null, cache.get(query));
    };
    return this.findOne(query, (err, answer) => {
      cache.set(query, answer);
      console.log('From db:', cache.get(query));
      cb(err, answer);
    });
  }
}
