;(function () {
  var resource = 'src/util/Observable';
  
  define([resource], function (Observable) {
    beforeEach(function () {
      this.observable = new Observable();
    });
    
    var itBehavesLikeChainableMethod = function (callback) {
      it('is chainable method', function () {
        expect(callback.call(this)).toBe(this.observable);
      });
    };
    
    describe(resource, function () {
      it('should be defined', function () {
        expect(Observable).toBeDefined();
      });
      
      describe('.observersCount', function () {
        it('returns actual count of observers', function () {
          expect(this.observable._observers.length).toBe(this.observable.observersCount);
        });
      });
      
      describe('.setChanged()', function () {
        it('sets Observable state to changed', function () {
          this.observable.setChanged();
          expect(this.observable._hasChanged).toBe(true);
        });
        
        itBehavesLikeChainableMethod(function () {
          return this.observable.setChanged();
        });
      });
      
      describe('.hasChanged()', function () {
        it('returns true if Observable state was changed', function () {
          expect(this.observable.hasChanged()).toBe(false);
          this.observable.setChanged();
          expect(this.observable.hasChanged()).toBe(true);
        });
      });
      
      describe('.clearChanged()', function () {
        it('sets Observable state to not changed', function () {
          this.observable.setChanged();
          this.observable.clearChanged();
          
          expect(this.observable.hasChanged()).toBe(false);
        });
        
        itBehavesLikeChainableMethod(function () {
          return this.observable.clearChanged();
        });
      });
      
      describe('.addObserver(observer)', function () {
        it('add callback to the array of observers', function () {
          var observer = function () {};
          this.observable.addObserver(observer);
          expect(this.observable.observersCount).toBe(1);
        });
        
        itBehavesLikeChainableMethod(function () {
          return this.observable.addObserver(new Function());
        });
      });
      
      describe('.removeObserver(observer)', function () {
        it('removes observer from observers list', function () {
          var observer = function () {};
          
          this.observable.addObserver(observer);
          this.observable.addObserver(observer);
          this.observable.addObserver(observer);
          
          this.observable.removeObserver(observer);
          
          expect(this.observable.observersCount).toBe(0);
        });
        
        itBehavesLikeChainableMethod(function () {
          return this.observable.removeObserver(new Function());
        });
      });
      
      describe('.notifyObservers(data)', function () {
        beforeEach(function () {
          this.test = {
            observer: new Function(),
            data: 10
          };
          
          spyOn(this.test, 'observer');
        });
        
        itBehavesLikeChainableMethod(function () {
          return this.observable.notifyObservers();
        });
  
        it('does not invoke observers if state was not changed', function () {
          this.observable.addObserver(this.test.observer);
          this.observable.clearChanged();
          this.observable.notifyObservers();
          
          expect(this.test.observer).not.toHaveBeenCalled();
        });
        
        it('invokes all observers with passed data', function () {
          this.observable.addObserver(this.test.observer);
          this.observable.setChanged();
          this.observable.notifyObservers(this.test.data);
          
          expect(this.test.observer).toHaveBeenCalledWith(this.test.data);
        });
      });
    });
  });
})();