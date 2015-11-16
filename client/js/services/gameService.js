app
  .service('gameService', function($q, $http, $cookies, authService, socketService, Observable) {
    this.game = null;
    this.keys = {};
    this.config = {};

    this.init = (width, height, id) => {
      this.game = new Phaser.Game(
        width,
        height,
        Phaser.AUTO,
        id,
        {
          preload: _.bind(this.preload, this),
          create: _.bind(this.create, this),
          update: _.bind(this.update, this),
          render: _.bind(this.render, this),
        }
      );
    }
    this.setMap = (chunk) => {
      console.log(chunk);
      this.map = this.game.add.tilemap();
      this.map.addTilesetImage(chunk.image);
      this.layer = this.map.create(
        chunk.layerName,
        this.config.chunkSize, this.config.chunkSize,
        this.config.tileSize, this.config.tileSize);
      this.layer.resizeWorld();
      for (var i = 0; i < this.config.chunkSize; i++) {
        for (var j = 0; j < this.config.chunkSize; j++) {
          this.map.putTile(chunk.tiles[(i * this.config.chunkSize + j)] , j, i, this.layer);
        }
      }
    }

    this.preload = () => {
      this.game.load.image('tiles', '/assets/images/tileset.png');
      this.game.load.image('chars', '/assets/images/chars.png');
      this.game.load.start();
    }

    this.create = () => {
      this.cursors = this.game.input.keyboard.createCursorKeys();
      socketService.socket.emit('config.get', {}, (data) => {
        this.config.chunkSize = data.chunkSize;
        this.config.tileSize = data.tileSize;
        console.log('Get config', data);
      });
      socketService.socket.emit('map.get', {x: 0, y: 0}, (data) => {
        console.log('Get map');
        this.setMap(data);
      });
      this.config.x = 0;
      this.config.y = 0;

      this.keys['w'] = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.keys['w'].onDown.add(() => {
        this.config.y ++;
        socketService.socket.emit('map.get', {x: this.config.x, y: this.config.y},
        (data) => {
          console.log('Get map');
          this.setMap(data);
        });
        socketService.action('character.movement', {
          direction: 'up',
        });
      }, this);
      this.keys['a'] = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.keys['a'].onDown.add(() => {
        this.config.x --;
        socketService.socket.emit('map.get', {x: this.config.x, y: this.config.y},
        (data) => {
          console.log('Get map');
          this.setMap(data);
        });
        socketService.action('character.movement', {
          direction: 'left',
        });
      }, this);
      this.keys['s'] = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.keys['s'].onDown.add(() => {
        this.config.y --;
        socketService.socket.emit('map.get', {x: this.config.x, y: this.config.y},
        (data) => {
          console.log('Get map');
          this.setMap(data);
        });
        socketService.action('character.movement', {
          direction: 'down',
        });
      }, this);
      this.keys['d'] = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
      this.keys['d'].onDown.add(() => {
        this.config.x ++;
        socketService.socket.emit('map.get', {x: this.config.x, y: this.config.y},
        (data) => {
          console.log('Get map');
          this.setMap(data);
        });
        socketService.action('character.movement', {
          direction: 'right',
        });
      }, this);
    }

    this.update = () => {
      if (this.cursors.left.isDown) {
        this.game.camera.x -= 32;
      }
      if (this.cursors.right.isDown) {
        this.game.camera.x += 32;
      }
      if (this.cursors.up.isDown) {
        this.game.camera.y -= 32;
      }
      if (this.cursors.down.isDown) {
        this.game.camera.y += 32;
      }
    }

    this.render = () => {
      this.game.debug.cameraInfo(this.game.camera, 50, 32);
    }
  });
