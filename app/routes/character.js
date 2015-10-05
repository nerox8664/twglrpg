var express = require('express');
var Character = require(__base + 'models/character.js');

var router = express.Router();

router.get('/', (req, res) => {
  res.send('List of chars');
});

router.post('/', (req, res) => {
  var char = new Character({
    name: req.body.name,
    currentChunk: [0, 0],
    positionX: 0,
    positionY: 0,
  });
  char.save((err, char) => {
    res.send(char);
  });
});

module.exports = router;
