app
  .controller('registerForm',
    function($scope, authService) {
      $scope.register = (email, password) => {
        authService.register(email, password);
      }
    })
