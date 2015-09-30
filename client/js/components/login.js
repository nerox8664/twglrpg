app
  .directive('loginForm',
    function(authService) {
      return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'login.html',
        controller: ['$scope', '$http', '$window',
          function($scope, $http, $window) {
            $scope.loginError = false;
            $scope.user = false;

            authService.user.addObserver(() => {
              $scope.user = authService.user.get();
            });

            $scope.login = (email, password) => {
              console.log('try to login', email, password);
              authService
                .login(email, password)
            }

            $scope.logout = () => {
              authService
                .logout();
            }
          }
        ]
      }
    })
