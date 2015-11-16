var randomstring = require('randomstring');

var jwtSecret = randomstring.generate(32);

module.exports = {
  mongoConnectionString: 'mongodb://localhost/rpg',
  port: 8089,
  jwtSecret: 'jwtSecret',
  cookieLifetime: 5 * 60 * 60,
  spawn: [16, 15],
  chunkSize: 32,
  tileSize: 32,
}
