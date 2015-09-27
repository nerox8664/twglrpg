var express = require('express');
var User = require(__base + 'models/user.js');
var jwt = require('jwt-simple');
var _ = require('lodash');

var router = express.Router();

router.get('/status', (req, res) => {
  if (req.user) {
    var token = jwt.encode({
      user: req.user._id,
      expire: Math.floor(Date.now() / 1000) + 30,
    }, config.jwtSecret);
    res.send({
      token: token,
      user: req.user,
    });
  }
});

router.post('/register', (req, res) => {
  var user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  user.save((err, user) => {
    var token = jwt.encode({
      user: user._id,
      expire: Math.floor(Date.now() / 1000) + 30,
    }, config.jwtSecret);
    res.send({
      token: token,
      user: user,
    });
  });
});

router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password,
  }, (err, user) => {
    if (user) {
      var token = jwt.encode({
        user: user._id,
        expire: Math.floor(Date.now() / 1000) + 30,
      }, config.jwtSecret);
      res.send({
        token: token,
        user: user,
      });

    } else {
      res.status(403).send({
        error: 'Auth failed',
      });
    }
  })
});

module.exports = router;