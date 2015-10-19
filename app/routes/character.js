var express = require('express');
var User = require(__base + 'models/user.js');

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
});

module.exports = router;
