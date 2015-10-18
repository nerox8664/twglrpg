app
  .controller('characterList',
    function($location, $scope, authService) {
      this.getList = function() {
        $http
          .get('/api/characters', {})
          .success((res) => {
            console.log(res);
          })
      }

      this.newCharacter = function(name) {
        $http
          .post('/api/characters', {name: name})
          .success((res) => {
            console.log(res);
          });
      }
    })
