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
                gameService.init(
                  $('#game-canvas').width(),
                  $('#game-canvas').height(),
                  'game-canvas'
                );
                $scope.loaded = true;
              }
            });
          }
        ]
      }
    })
