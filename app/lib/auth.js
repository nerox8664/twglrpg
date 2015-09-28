var User = require(__base + 'models/user.js');
var debug = require('debug')('auth');
var jwt = require('jwt-simple');

module.exports = (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    var token = jwt.decode(req.cookies.token, config.jwtSecret);
    if (token.expire > Math.floor(Date.now() / 1000)) {
      User.findOneInCache({_id: token.user}, (err, user) => {
        req.user = user;
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
}
