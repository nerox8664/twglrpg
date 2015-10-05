app
  .directive('loginForm',
    function(authService, $location) {
      return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'directives/login.html',
        controller: ['$scope', '$http', '$window',
          function($scope, $http, $window) {
            $scope.loginError = false;
            $scope.user = false;
            $scope.currentPath = $location;

            authService.user.addObserver(() => {
              $scope.user = authService.user.get();
            });

            $scope.login = function(email, password) {
              console.log('try to login', email, password);
              authService
                .login(email, password)
                .then(function() {
                  $location.path('/profile');
                });
            }

            $scope.logout = function() {
              authService
                .logout();
            }
          }
        ]
      }
    })
