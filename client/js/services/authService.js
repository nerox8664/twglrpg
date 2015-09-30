app
  .service('authService', function($q, $http, $cookies, $interval, Observable) {
    this.user = new Observable(null);
    this.token = new Observable(null);

    this.token.addObserver((token) => {
      $cookies.put('token', token);
      console.log('get token:', token);
    });

    this.checkLogin = (res) => {
      if (!res.token) {
        return $q.reject(res);
      }
      this.token.set(res.token);
      this.user.set(res.user);
      return res;
    }

    this.authStatus = () => {
      return $http
        .get('/auth/status', {})
        .success((res) => {
          return this.checkLogin(res);
        })
    }

    this.login = (email, password) => {
      return $http
        .post('/auth/login', {
          email: email,
          password: password,
        })
        .success((res) => {
          return this.checkLogin(res);
        })
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
        .success((res) => {
          return this.checkLogin(res);
        });
    }

    $interval(() => {
      this.authStatus();
    }, 5000);
  })
