class Game {
  constructor() {
    this.socket = io('http://localhost:8089');
    this.game = new Phaser.Game(
      $('#game-canvas').width(),
      $('#game-canvas').height(),
      Phaser.AUTO,
      'game-canvas',
      {
        preload: _.bind(this.preload, this),
        create: _.bind(this.create, this),
        update: _.bind(this.update, this),
        render: _.bind(this.render, this),
      }
    );
    this.loaded = false;
    this.game.sound = true;
    this.socket.on('game.map.post', function(data) {
      console.log(data);
      this.setMap(data);
      this.loaded = 1;
    });
  }

  setMap(chunk) {
    this.map = this.game.add.tilemap();

    this.map.addTilesetImage(chunk.image);
    this.layer = this.map.create(chunk.layerName, chunk.size[0], chunk.size[1], chunk.tileSize[0], chunk.tileSize[1]);
    this.layer.resizeWorld();

    console.log(this.map);

    for (var i = 0; i < chunk.size[1]; i++) {
      for (var j = 0; j < chunk.size[0]; j++) {
        this.map.putTile(chunk.tiles[(i * chunk.size[0] + j) % chunk.tiles.length] , j, i, this.layer);
      }
    }
  }

  preload() {
    this.game.load.image('tiles', '/assets/images/tileset.png');
    this.game.load.image('chars', '/assets/images/chars.png');
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.socket.on('game.character.create', function(data) {
      this.character = this.game.add.tileSprite(0, 0, 32, 32, 'chars');
      this.character.x = data.positionX;
      this.character.y = data.positionY;
      this.character.width = 32;
      this.character.height = 32;
      this.game.camera.follow(this.character);
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.socket.emit('game.character.movement', {
        dx: -16,
        dy: 0,
      });
    }
    if (this.cursors.right.isDown) {
      this.socket.emit('game.character.movement', {
        dx: 16,
        dy: 0,
      });
    }
    if (this.cursors.up.isDown) {
      this.socket.emit('game.character.movement', {
        dx: 0,
        dy: -16,
      });
    }
    if (this.cursors.down.isDown) {
      this.socket.emit('game.character.movement', {
        dx: 0,
        dy: 16,
      });
    }
    // if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    //   this.character.body.velocity.x -= 128;
    // }
    // if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    //   this.character.body.velocity.x += 128;
    // }
    // if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    //   this.character.body.velocity.y -= 128;
    // }
    // if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    //   this.character.body.velocity.y += 128;
    // }
    // if (this.game.input.keyboard.isDown(Phaser.Keyboard.E)) {
    //   this.character.body.velocity.x -= 128;
    // }
  }

  render() {
    // this.game.debug.cameraInfo(this.game.camera, 50, 32);
    // this.game.debug.bodyInfo(this.character, 32, 320);
  }
}