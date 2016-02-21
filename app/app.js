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

// Global path configuration
global.appRoot = __dirname + '/../';
global.__base = __dirname + '/';
global.config = require(__dirname + '/config.js');

// Connect to MongoDB
mongoose.connect(config.mongoConnectionString);
mongoose.connection.on('error', () => {
  debug('Connection error');
});
mongoose.connection.once('open', (callback) => {
  debug('Mongoose connected');
});

// Attach express middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(require('compression')());
app.use(require('morgan')('dev'));

// Auth service
var auth = require(__base + 'lib/auth.js');
app.use(auth.checkUser);

// Static routes
app.use('/', express.static(appRoot + 'public'));
app.use('/bower_components', express.static(appRoot + 'bower_components'));
app.use('/assets', express.static(appRoot + 'assets'));
app.use('/themes', express.static(appRoot + 'components/semantic/src/themes'));

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
app.use('/api/user', require(__base + 'routes/user.js'));
app.use('/api/auth', require(__base + 'routes/auth.js'));
app.use('/api/characters', auth.onlyUsers, require(__base + 'routes/character.js'));

app.get('/*', (req, res) => {
  res
    .status(200)
    .set({
      'content-type': 'text/html; charset=utf-8',
    })
    .sendFile(path.normalize(appRoot + 'public/index.html'));
});

var gameService = require(__base + 'services/game.js')();

io.on('connection', (socket) => {
  debug('New connection');
  require(__base + 'events/client.js')(socket, gameService);
});

server.listen(config.port, () => {
  debug('Binded to port');
});

module.exports = app;
