var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Debug output
var debug = require('debug')('app');

// Express
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

global.appRoot = __dirname + '/../'
global.__base = __dirname + '/';
global.config = require(__dirname + '/config.js');

mongoose.connect(global.config.mongoConnectionString);

// Attach express middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(require('compression')());
app.use(require('morgan')('dev'));

// Auth service
app.use(require(__base + 'lib/auth.js'));

// Static routes
app.use('/', express.static(appRoot + 'public'));
app.use('/bower_components', express.static(appRoot + 'bower_components'));
app.use('/assets', express.static(appRoot + 'assets'));

// Allow cross-domain requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token');
  if (req.method === 'OPTIONS') {
    return res.end();
  }
  next();
});

// Routes
app.use('/users', require(__base + 'routes/users.js'));
app.use('/auth', require(__base + 'routes/auth.js'));

io.on('connection', (socket) => {
  debug('New connection');
  require(__base + 'events/game.js')(socket);
});

server.listen(8089, () => {
  debug('Binded to port');
});

module.exports = app;
