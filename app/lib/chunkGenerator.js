var Chunk = require(__base + 'models/chunk.js');


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

module.exports = (x, y) => {
  console.log('Chunk generation called');
  var landscapeTiles = [0, 173, 324, 442];
  var tiles = [];
  var road = getBezierCurve(
    [
      [0,0],
      [0, Math.random() * config.chunkSize - 1],
      [12, Math.random() * config.chunkSize - 1]
    ],
    0.01);
  console.log(road);
  for (var i = 0; i < config.chunkSize; i++) {
    for (var j = 0; j < config.chunkSize; j++) {
      tiles[i * config.chunkSize + j] = landscapeTiles[Math.ceil(Math.random() * landscapeTiles.length - 1)];
    }
  }
  for (var i = 0; i < road.length; i++) {
    tiles[Math.floor(road[i][1]) * config.chunkSize + Math.floor(road[i][0])] = 34;
  }
  var chunk = {
    tiles: tiles,
    x: x,
    y: y,
    image: 'tiles',
  };
  console.log('Chunk generated');
  return chunk;
}
