var User = require(__base + 'models/user.js');
var debug = require('debug')('auth');
var jwt = require('jwt-simple');

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
  if (req.cookies && req.cookies.token) {
    debug('Token was given as client cookies: ' + req.cookies.token);
    req.token = jwt.decode(req.cookies.token, config.jwtSecret);
    if (req.token.expire > Math.floor(Date.now() / 1000)) {
      debug('Token not expired: ' + req.token.expire);
      User.findOneInCache({_id: req.token.user}, (err, user) => {
        req.user = user;
        next();
      });
    } else {
      debug('Token expired: ' + req.token.expire);
      next();
    }
  } else {
    next();
  }
}
