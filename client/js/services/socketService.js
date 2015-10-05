app
  .service('socketService', function($q, $http, $interval, authService, Observable) {
    this.socket = io('http://localhost:8089');
    this.action = function(action, data) {
      data.token = authService.token.get();
      if (data.token) {
        this.socket.emit(action, data);
      } else {
        console.log('Action called, but token undefined');
      }
    };
  })
