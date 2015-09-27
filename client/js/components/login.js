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
            $scope.token = false;

            authService.token.addObserver(() => {
              $scope.loginError = false;
              $scope.token = authService.token;
            });

            $scope.login = function(email, password) {
              console.log('try to login', email, password);
              authService
                .login(email, password)
            }
            $scope.register = function(email, password) {
              console.log('try to register', email, password);
              authService
                .register(email, password)
            }
          }
        ]
      }
    })
