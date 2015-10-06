var express = require('express');
var Character = require(__base + 'models/character.js');
var User = require(__base + 'models/user.js');

var router = express.Router();

router.get('/', (req, res) => {
  User.findOne(req.user).populate('characters').exec((err, user) => {
    res.send(req.user.characters);
  })
});

router.post('/', (req, res) => {
  var char = new Character({
    name: req.body.name,
    currentChunk: [0, 0],
    positionX: 0,
    positionY: 0,
  });
  char.save((err, char) => {
    req.user.characters.unshift(char);
    req.user.save((err, user) => {
      res.send(char);
    });
  });
});

module.exports = router;
