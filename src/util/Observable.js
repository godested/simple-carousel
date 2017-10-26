define(function () {
  var Observable = function Observable() {
    this._hasChanged = false;
    
    this._observers = [];
  };
  
  Object.defineProperty(Observable.prototype, 'observersCount', {
    get: function () {
      return this._observers.length
    }
  });
  
  Observable.prototype.setChanged = function () {
    this._hasChanged = true;
    return this;
  };
  
  Observable.prototype.hasChanged = function () {
    return this._hasChanged;
  };
  
  Observable.prototype.clearChanged = function () {
    this._hasChanged = false;
    return this;
  };
  
  Observable.prototype.addObserver = function (observer) {
    this._observers.push(observer);
    return this;
  };
  
  Observable.prototype.removeObserver = function (observer) {
    this._observers = this._observers.filter(function (registeredObserver) {
      return registeredObserver !== observer;
    });
    
    return this;
  };
  
  Observable.prototype.notifyObservers = function (data) {
    this.hasChanged() && this._observers.forEach(function (observer) {
      observer(data);
    });
    
    this.clearChanged();
    
    return this;
  };
  
  return Observable;
});