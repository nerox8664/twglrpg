var app = angular.module('twglrpg', ['ngCookies', 'ngRoute']);
app.config(($routeProvider, $locationProvider) => {
  $routeProvider
   .when('/register', {
      templateUrl: 'register.html',
    })
    .when('/profile', {
       templateUrl: 'profile.html',
     })
    .when('/game', {
       template: '<game></game>',
     })
    .otherwise({
      templateUrl: 'main.html',
    });
  $locationProvider.html5Mode(true);
});

app.run(['$rootScope', '$location', 'authService', ($rootScope, $location, authService) => {
  $rootScope.$on('$routeChangeStart', (event) => {
    authService
      .checkLogin()
      .then(
        () => {
          console.log('ALLOW');
          $location.path('/profile');
        },
        () => {
          console.log('DENY');
          event.preventDefault();
          $location.path('/login');
        }
      );
  });
}]);
