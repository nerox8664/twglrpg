app
  .directive('registerForm',
    function(authService) {
      return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'register.html',
        controller: ['$scope', '$http', '$window',
          function($scope, $http, $window) {
            $scope.register = (email, password) => {
              console.log('try to register', email, password);
              authService
                .register(email, password)
            }
          }
        ]
      }
    })
