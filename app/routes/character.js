var express = require('express');
var User = require(__base + 'models/user.js');
var GameObject = require(__base + 'models/user.js');

var router = express.Router();

router.get('/', (req, res) => {
  User
    .findOne(req.user)
    .populate('characters')
    .exec((err, user) => {
      res.send(req.user.characters);
    })
});

router.post('/', (req, res) => {
  var character = GameObject({
    positionX: config.spawn[0],
    positionY: config.spawn[1],
    objectClass: req.body.objectClass,
  });

  character.save((err, character) => {
    res.send(character);
  });
});

module.exports = router;
