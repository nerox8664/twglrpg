app
  .directive('game',
    function(authService) {
      return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'game.html',
        controller: ['$scope', '$http', '$window',
          function($scope, $http, $window) {
            authService.token.addObserver(() => {
              var g = new Game();
            });
          }
        ]
      }
    })
