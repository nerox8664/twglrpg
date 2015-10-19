app
  .controller('registerForm',
    function($location, $scope, authService) {
      $scope.registerError = false;

      $scope.register = (email, password, nickname) => {
        authService
          .register(email, password, nickname)
          .success(function() {
            $location.path('/profile');
          })
          .error(function() {
            $scope.loginError = true;
          });
      }
    })
