var User = require(__base + 'models/user.js');
var debug = require('debug')('auth');
var Token = require(__base + 'lib/token.js');

module.exports.onlyUsers = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res
      .status(403)
      .send({
        error: 'Access denied',
      });
  }
}

module.exports.checkUser = (req, res, next) => {
  req.token = new Token(req.cookies.token);
  if (req.token.check()) {
    User.findOne({_id: req.token.user}, (err, user) => {
      if (err) {
        next(err);
      } else {
        console.log('user set');
        req.user = user;
        next();
      }
    });
  } else {
    next();
  }
}
