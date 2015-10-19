app
  .directive('loginForm',
    function(authService, $location) {
      return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'directives/login.html',
        controller: ['$scope', '$http', '$window', '$state',
          function($scope, $http, $window, $state) {
            $scope.loginError = false;
            $scope.user = authService.user.get();
            $scope.currentPath = $location;

            authService.user.addObserver(() => {
              $scope.user = authService.user.get();
            });

            $scope.login = function(email, password) {
              authService
                .login(email, password)
                .then(function() {
                  $location.path('/profile');
                });
            }

            $scope.logout = function() {
              authService
                .logout();
              $state.reload();
            }
          }
        ]
      }
    })
