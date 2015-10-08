app
  .directive('game',
    function(authService, gameService) {
      return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'directives/game.html',
        controller: ['$scope', '$http', '$window',
          function($scope, $http, $window) {
            gameService.init(
              $('#game-canvas').width(),
              $('#game-canvas').height(),
              'game-canvas'
            );
          }
        ]
      }
    })
