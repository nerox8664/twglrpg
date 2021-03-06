var chunkGenerator = require(__base + 'lib/chunkGenerator.js');
var Datastore = require('nedb');
var Q = require('q');

var Chunk = require(__base + 'models/chunk.js');

var objects = new Datastore();
var chunks = new Datastore();

module.exports = () => {
  this.objectAdd = function(object) {
    objects.insert(object);
  }

  this.objectDelete = function(object) {
    objects.remove(object);
  }

  this.objectMove = function(object, newCoords) {
  }

  this.getChunk = function(x, y) {
    var deferred = Q.defer();
    Chunk.findOne({x: x, y: y}, function(err, cachedChunk) {
      if (err) {
        deferred.reject(err);
      } else if (!cachedChunk) {
        chunkGenerator(x, y).then(function(cachedChunk) {
          // chunks.insert(cachedChunk);
          cachedChunk.save((err, chunk) => {
            if (err) {
              console.log(err);
            }
            deferred.resolve(chunk);
          });
        });
      } else {
        deferred.resolve(cachedChunk);
      }
    });
    return deferred.promise;
  }

  return this;
}
