'use strict';

var jwt = require('jwt-simple');

class Token {
  constructor(rawToken) {
    this._token = rawToken ? jwt.decode(rawToken, config.jwtSecret) : {};
  }

  setUser(user) {
    this._token.user = user._id;
  }

  get user() {
    return this._token.user;
  }

  set user(user) {
    this._token.user = user._id;
  }

  check() {
    return this._token && this._token.expire > Math.floor(Date.now() / 1000);
  }

  renew() {
    this._token.expire = Math.floor(Date.now() / 1000) + config.cookieLifetime;
  }

  serialize() {
    this.renew();
    return jwt.encode(this._token, config.jwtSecret);
  }
};


module.exports = Token;
