app
  .controller('characterList',
    function($location, $scope, $http, authService) {
      this.getList = function() {
        $http
          .get('/api/characters', {})
          .success((res) => {
            console.log(res);
          })
      };

      $scope.choose = function() {
        console.log('Character chosen');
      };

      this.newCharacter = function(name) {
        $http
          .post('/api/characters', {name: name})
          .success((res) => {
            console.log(res);
          });
      }

      this.getList();
    })
