app
  .service('authService', function($q, $http, $cookies, $interval, Observable) {
    this.user = new Observable(null);
    this.token = new Observable(null);

    this.token.addObserver((token) => {
      $cookies.put('token', token);
      console.log('New token : ', token);
      this.getUserData();
    });

    this.getUserData = () => {
      return $http
        .get('/api/user', {})
        .success((res) => {
          console.log('User : ', res);
          if (res.user) {
            this.user.set(res.user);
          }
        });
    }

    this.parseAuthData = (res) => {
      if (res.token) {
        this.token.set(res.token);
      }
    };

    this.checkLogin = () => {
      var deferred = $q.defer();
      if (this.token.get()) {
        deferred.resolve();
      } else {
        $http
          .get('/api/auth/renew', {})
          .success((res) => {
            this.parseAuthData(res);
            if (!res.token) {
              deferred.reject();
            } else {
              deferred.resolve();
            }
          })
          .error(() => {
            deferred.reject();
          })
      }
      return deferred.promise;
    }

    this.login = (email, password) => {
      return $http
        .post('/api/auth/login', {
          email: email,
          password: password,
        })
        .success(this.parseAuthData)
    };

    this.logout = () => {
      this.token.set(null);
      this.user.set(null);
      $cookies.remove('token');
    }

    this.register = (email, password, nickname) => {
      return $http
        .post('/api/auth/register', {
          email: email,
          password: password,
          nickname: nickname,
        })
        .success(this.parseAuthData);
    }

    $interval(() => {
      this.checkLogin();
    }, 1000 * 60);

    this.checkLogin();
  })
111
