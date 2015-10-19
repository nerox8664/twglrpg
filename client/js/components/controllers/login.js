app
  .controller('loginForm',
    function($location, $scope, authService) {
      $scope.loginError = false;
      $scope.user = authService.user.get();
      $scope.currentPath = $location;

      authService.user.addObserver(() => {
        $scope.user = authService.user.get();
      });

      $scope.login = function(email, password) {
        authService
          .login(email, password)
          .success(function() {
            $location.path('/profile');
          })
          .error(function() {
            $scope.loginError = true;
          });
      }

      $scope.logout = function() {
        authService
          .logout();
      }
    })
