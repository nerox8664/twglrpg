app
  .service('gameService', function($q, $http, $cookies, authService, socketService, Observable) {
    this.game = null;
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
      this.layer = this.map.create(chunk.layerName, chunk.size[0], chunk.size[1], chunk.tileSize[0], chunk.tileSize[1]);
      this.layer.resizeWorld();
      for (var i = 0; i < chunk.size[1]; i++) {
        for (var j = 0; j < chunk.size[0]; j++) {
          this.map.putTile(chunk.tiles[(i * chunk.size[0] + j)] - 1 , j, i, this.layer);
        }
      }
    }

    this.preload = () => {
      this.game.load.image('tiles', '/assets/images/tileset.png');
      this.game.load.image('chars', '/assets/images/chars.png');
    }

    this.create = () => {
      this.cursors = this.game.input.keyboard.createCursorKeys();
      socketService.socket.on('map.post', this.setMap);
      socketService.action('map.get', {});
    }

    this.update = () => {
      if (this.cursors.left.isDown) {
        socketService.action('character.movement', {
          direction: 'left',
        });
      }
      if (this.cursors.right.isDown) {
        socketService.action('character.movement', {
          direction: 'right',
        });
      }
      if (this.cursors.up.isDown) {
        socketService.action('character.movement', {
          direction: 'up',
        });
      }
      if (this.cursors.down.isDown) {
        socketService.action('character.movement', {
          direction: 'down',
        });
      }
    }

    this.render = () => {
      this.game.debug.cameraInfo(this.game.camera, 50, 32);
    }
  });
