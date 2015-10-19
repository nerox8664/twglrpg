var randomstring = require('randomstring');

var jwtSecret = randomstring.generate(32);

module.exports = {
  mongoConnectionString: 'mongodb://localhost/rpg',
  jwtSecret: 'jwtSecret',
  cookieLifetime: 5 * 60 * 60,
  spawn: [16, 15],
}
