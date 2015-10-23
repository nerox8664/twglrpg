var express = require('express');
var router = express.Router();
var User = require(__base + 'models/user.js');
var multer  = require('multer');
var upload = multer({ dest: appRoot + 'public/uploads/' });

router.get('/:nick', function(req, res) {
  User
    .findOne({nickname: req.params.nickname})
    .exec(function(err, user) {
      res.send(user);
    })
});

router.post('/profile', upload.single('avatar'), function(req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

module.exports = router;
