var randomstring = require('randomstring');

var jwtSecret = randomstring.generate(32);

module.exports = {
  jwtSecret: jwtSecret,
  cookieLifetime: 5 * 60,
}
