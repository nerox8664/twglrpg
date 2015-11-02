var express = require('express');
var router = express.Router();
var User = require(__base + 'models/user.js');
var multer  = require('multer');
var upload = multer({ dest: appRoot + 'public/uploads/' });

router.get('/', (req, res) => {
  res.send({
    user: req.user,
  });
});

router.get('/:nick', function(req, res) {
  User
    .findOne({nickname: req.params.nickname})
    .exec(function(err, user) {
      res.send(user);
    })
});

router.post('/', (req, res) => {
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname,
  });

  user.save((err, user) => {
    console.log(err, user);
    if (err) {
      return res
        .status(403)
        .send({
          error: 'Register failed',
        });
    }

    var token = new Token();
    token.user = user;

    return res.send({
      token: token.serialize(),
      user: user,
    });
  });
});

router.post('/profile', upload.single('avatar'), function(req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

module.exports = router;
