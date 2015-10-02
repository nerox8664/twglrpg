var app = angular.module('twglrpg', ['ngCookies', 'ngRoute']);
app.config(($routeProvider, $locationProvider) => {
  $routeProvider
   .when('/register', {
      templateUrl: 'register.html',
    })
    .when('/game', {
       template: '<game></game>',
     })
    .otherwise({
      templateUrl: 'main.html',
    });
  $locationProvider.html5Mode(true);
});
