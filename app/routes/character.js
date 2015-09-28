var express = require('express');
var User = require(__base + 'models/user.js');

var router = express.Router();

router.post('/login', (req, res) => {
  User.findOneInCache({
    email: req.body.email,
    password: req.body.password,
  }, (err, user) => {
    if (user) {
      var token = jwt.encode({
        user: user._id,
        expire: Math.floor(Date.now() / 1000) + config.cookieLifetime,
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
