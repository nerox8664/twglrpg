var express = require('express');
var Token = require(__base + 'lib/token.js');
var User = require(__base + 'models/user.js');

var router = express.Router();

router.get('/renew', (req, res) => {
  if (req.token.check()) {
    res.send({
      token: req.token.serialize(),
    });
  } else {
    res
      .status(403)
      .send({
        error: 'Token expired',
      });
  }
});

router.get('/renew', (req, res) => {
  if (req.token.check()) {
    res.send({
      token: req.token.serialize(),
    });
  } else {
    res
      .status(403)
      .send({
        error: 'Token expired',
      });
  }
});

router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password,
  }, (err, user) => {
    if (user) {
      var token = new Token();
      token.user = user;
      res.send({
        token: token.serialize(),
      });
    } else {
      res
        .status(403)
        .send({
          error: 'Auth failed',
        });
    }
  })
});

module.exports = router;
