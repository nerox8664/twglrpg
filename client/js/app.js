var app = angular.module('twglrpg', ['ngCookies', 'ngRoute', 'ui.router']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('1column', {
      abstract: true,
      url: '',
      templateUrl: 'layouts/1column.html',
    })
    .state('2column', {
      abstract: true,
      url: '',
      templateUrl: 'layouts/2column.html',
    })
    .state('2column.root', {
      url: '/',
      views: {
        'content': {
          templateUrl: 'main.html',
        },
      }
    })
    .state('1column.login', {
      url: '/login',
      views: {
        'content': {
          templateUrl: 'login.html',
        },
      }
    })
    .state('2column.login', {
      url: '/profile',
      views: {
        'content': {
          templateUrl: 'profile.html',
        },
      }
    })
    .state('2column.game', {
      url: '/game',
      views: {
        'content': {
          templateUrl: 'game.html',
        },
      }
    })
    .state('2column.characters', {
      url: '/characters',
      views: {
        'content': {
          templateUrl: 'characters.html',
        },
      }
    })
    .state('2column.qa', {
      url: '/qa',
      views: {
        'content': {
          templateUrl: 'qa.html',
        },
      }
    })
    .state('404', {
      url: '/404',
      templateUrl: '404.html',
    })
});

app.run([
  '$rootScope', '$state', '$location', '$stateParams', 'authService',
  function($rootScope, $state, $location, $stateParams, authService) {
    console.log($location.path());
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        if (_.findIndex(['/', '/register', '/login'], function(loc) {
          return $location.path() === loc;
        }) >= 0) {
          console.log('ALLOW default');
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
      }
    );
  }
])
