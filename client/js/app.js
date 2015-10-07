var app = angular.module('twglrpg', ['ngCookies', 'ngRoute', 'ui.router']);
// app.config(($routeProvider, $locationProvider) => {
//   $routeProvider
//    .when('/register', {
//       templateUrl: 'register.html',
//     })
//     .when('/profile', {
//        templateUrl: 'profile.html',
//      })
//      .when('/login', {
//         templateUrl: 'login.html',
//       })
//     .when('/game', {
//        template: '<game></game>',
//      })
//      .when('/characters', {
//         templateUrl: 'characters.html',
//       })
//      .when('/', {
//         templateUrl: 'main.html',
//       })
//     .otherwise({
//       templateUrl: '404.html',
//     });
//   $locationProvider.html5Mode(true);
// });
app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "partials/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
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
