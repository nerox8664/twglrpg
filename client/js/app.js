var app = angular.module('twglrpg', ['ngCookies', 'ngRoute']);
app.config(($routeProvider, $locationProvider) => {
  $routeProvider
   .when('/register', {
      templateUrl: 'register.html',
    })
    .when('/profile', {
       templateUrl: 'profile.html',
     })
     .when('/login', {
        templateUrl: 'login.html',
      })
    .when('/game', {
       template: '<div id="game-canvas" class="ui inverted segment"></div><game></game>',
     })
    .otherwise({
      templateUrl: 'main.html',
    });
  $locationProvider.html5Mode(true);
});

app.run(['$rootScope', '$location', 'authService', ($rootScope, $location, authService) => {
  $rootScope.$on('$routeChangeStart', (event, next, current) => {
    console.log($location.path());
    if ($location.path() == '/register') {
      console.log('ALLOW');
      return;
    }
    authService
      .checkLogin()
      .then(
        () => {
          console.log('ALLOW');
        },
        () => {
          console.log('DENY');
          event.preventDefault();
          $location.path('/login');
        }
      );
  });
}]);
