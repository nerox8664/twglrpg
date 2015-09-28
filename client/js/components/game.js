app
  .directive('game',
    function(authService, gameService) {
      return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'game.html',
        controller: ['$scope', '$http', '$window',
          function($scope, $http, $window) {
            $scope.loaded = false;
            authService.token.addObserver(() => {
              if (!$scope.loaded) {
                gameService.game = new Phaser.Game(
                  $('#game-canvas').width(),
                  $('#game-canvas').height(),
                  Phaser.AUTO,
                  'game-canvas',
                  {
                    preload: _.bind(gameService.preload, gameService),
                    create: _.bind(gameService.create, gameService),
                    update: _.bind(gameService.update, gameService),
                    render: _.bind(gameService.render, gameService),
                  }
                );
                $scope.loaded = true;
              }
            });
          }
        ]
      }
    })
