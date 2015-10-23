var Chunk = require(__base + 'models/chunk.js');


function getBezierCurve(arr, step) {

  var getBezierBasis = (i, n, t) => {
    function f(n) {
      return (n <= 1) ? 1 : n * f(n - 1);
    }
    return (f(n) / (f(i) * f(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
  }

  if (!step) {
    step = 0.1;
  }

  var res = [];
  step = step / arr.length;

  for (var t = 0.0; t < 1 + step; t += step) {
    if (t > 1) {
      t = 1;
    }
    var ind = res.length;
    res[ind] = new Array(0, 0);
    for (var i = 0; i < arr.length; i++) {
      var b = getBezierBasis(i, arr.length - 1, t);
      res[ind][0] += arr[i][0] * b;
      res[ind][1] += arr[i][1] * b;
    }
  }
  return res;
}

module.exports = (x, y) => {
  // тут получить соседние чанки и посмотреть их границы, если там есть дороги, соединить их
  // если дорог нет, можно выбрать любые внутренние точки.
  // если какого-то из соседних чанков еще нет (не сгенерирован), к его грани можно подвести дорогу
  console.log('Chunk generation called');
  var landscapeTiles = [0, 173, 324, 442];
  var tiles = [];
  for (var i = 0; i < config.chunkSize; i++) {
    for (var j = 0; j < config.chunkSize; j++) {
      tiles[i * config.chunkSize + j] = landscapeTiles[Math.ceil(Math.random() * landscapeTiles.length - 1)];
    }
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
