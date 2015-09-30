var app = angular.module('twglrpg', ['ngCookies', 'ngRoute']);
app.config(($routeProvider, $locationProvider) => {
  $routeProvider
   .when('/register', {
    templateUrl: 'register.html',
  })
  .otherwise({
    templateUrl: 'main.html',
  })
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});
