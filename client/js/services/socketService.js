app
  .service('socketService', function($q, $http, $interval, authService, Observable) {
    this.socket = io('http://localhost:8089');
    this.action = function(action, data) {
      data.token = authService.token.get();
      this.socket.emit(action, data);
    };
  })
