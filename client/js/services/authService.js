app
  .service('authService', function($q, $http, $cookies, $interval, Observable) {
    this.user = new Observable(null);
    this.token = new Observable(null);

    this.token.addObserver((token) => {
      $cookies.put('token', token);
      console.log('New token : ', token);
    });

    this.parseAuthData = (res) => {
      if (res.token) {
        this.token.set(res.token);
        this.user.set(res.user);
      }
    };

    this.checkLogin = () => {
      var deferred = $q.defer();
      $http
        .get('/auth/status', {})
        .success((res) => {
          this.parseAuthData(res);
          if (!res.token) {
            return deferred.reject();
          } else {
            deferred.resolve();
          }
        })
        .error(() => {
          deferred.reject();
        })
      return deferred.promise;
    }

    this.login = (email, password) => {
      return $http
        .post('/auth/login', {
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

    this.register = (email, password) => {
      return $http
        .post('/auth/register', {
          email: email,
          password: password,
        })
        .success(this.parseAuthData);
    }

    $interval(() => {
      this.checkLogin();
    }, 1000 * 60);

    this.checkLogin();
  })
111
