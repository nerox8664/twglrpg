angular.module('twglrpg')
  .factory('Observable', () => {
    function Observable(value) {
      this.value = value;
      this.observers = [];
    }

    Observable.prototype.get = function() {
      return this.value;
    };

    Observable.prototype.set = function(value) {
      this.value = value;
      this.notify();
      return this;
    };

    Observable.prototype.addObserver = function(fn) {
      this.observers.push(fn);
    };

    Observable.prototype.notify = function() {
      _.invoke(this.observers, 'call', null, this.value);
    };

    return Observable;

  });
