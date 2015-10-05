app
  .controller('loginForm',
    function($location, $scope, authService) {
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
    })
