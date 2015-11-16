var Chunk = require(__base + 'models/chunk.js');
var Q = require('q');

function getBezierCurve(arr, step) {

  var getBezierBasis = (i, n, t) => {
    function f(n) {
      return (n <= 1) ? 1 : n * f(n - 1);
    }
    return (f(n) / (f(i) * f(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
  }

  var res = [];
  step = step / arr.length;

  for (var t = 0.0; t < 1 + step; t += step) {
    var ind = res.length;
    res[ind] = [0, 0];
    for (var i = 0; i < arr.length; i++) {
      var b = getBezierBasis(i, arr.length - 1, Math.min(t, 1));
      res[ind][0] += arr[i][0] * b;
      res[ind][1] += arr[i][1] * b;
    }
  }

  return res;
}

function isRoad(tile) {
  return tile === 34;
}

function generateRoads(x, y, tiles) {
  return Q
    .all([
      Chunk.findOne({x: x, y: y + 1}).exec(),
      Chunk.findOne({x: x + 1, y: y}).exec(),
      Chunk.findOne({x: x, y: y - 1}).exec(),
      Chunk.findOne({x: x - 1, y: y}).exec(),
    ])
    .then(function(results) {
      var borders = [];
      if (results[0]) {
        for (var i = config.chunkSize * (config.chunkSize - 1); i < config.chunkSize * config.chunkSize; i++) {
          if (isRoad(results[0].tiles[i])) {
            borders.push([i % config.chunkSize, 0]);
          }
        }
      } else if (Math.random() > 0.4) {
        borders.push([Math.random() * (config.chunkSize - 1), 0]);
      }
      if (results[1]) {
        for (var i = 0; i < config.chunkSize * config.chunkSize; i += config.chunkSize) {
          if (isRoad(results[1].tiles[i])) {
            borders.push([config.chunkSize - 1, i / config.chunkSize]);
          }
        }
      } else if (Math.random() > 0.4) {
        borders.push([config.chunkSize - 1, Math.random() * (config.chunkSize - 1)]);
      }
      if (results[2]) {
        for (var i = 0; i < config.chunkSize; i++) {
          if (isRoad(results[2].tiles[i])) {
            borders.push([i % config.chunkSize, config.chunkSize - 1]);
          }
        }
      } else if (Math.random() > 0.4) {
        borders.push([Math.random() * (config.chunkSize - 1), config.chunkSize - 1]);
      }
      if (results[3]) {
        for (var i = 0; i < config.chunkSize * config.chunkSize; i += config.chunkSize) {
          if (isRoad(results[3].tiles[i + config.chunkSize - 1])) {
            borders.push([0, i / config.chunkSize]);
          }
        }
      } else if (Math.random() > 0.4) {
        borders.push([0, Math.random() * (config.chunkSize - 1)]);
      }

      if (Math.random()) {
        borders.push(
          [
            Math.random() * (config.chunkSize - 1),
            Math.random() * (config.chunkSize - 1),
          ]
        );
      }

      console.log('borders', borders);

      var road = getBezierCurve(
        borders,
        0.01
      );

      // console.log(road);

      for (var i = 0; i < road.length; i++) {
        tiles[Math.floor(road[i][1]) * config.chunkSize + Math.floor(road[i][0])] = 34;
      }

    });
}

module.exports = (x, y) => {
  console.log('Chunk generation called');
  var landscapeTiles = [0, 173, 324, 442];
  var tiles = [];

  for (var i = 0; i < config.chunkSize; i++) {
    for (var j = 0; j < config.chunkSize; j++) {
      tiles[i * config.chunkSize + j] = landscapeTiles[Math.ceil(Math.random() * landscapeTiles.length - 1)];
    }
  }

  return generateRoads(x, y, tiles).then(function() {
    var chunk = {
      tiles: tiles,
      x: x,
      y: y,
      image: 'tiles',
    };
    console.log('Chunk generated');
    return chunk;
  })
}
