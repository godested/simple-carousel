;(function () {
  var resource = 'src/util/Observable';
  
  define([resource], function (Observable) {
    beforeEach(function () {
      this.subject = new Observable();
    });
    
    describe(resource, function () {
      it('should be defined', function () {
        expect(Observable).toBeDefined();
      });
      
      describe('.observersCount', function () {
        it('returns actual count of observers', function () {
          expect(this.subject._observers.length).toBe(this.subject.observersCount);
        });
      });
      
      describe('.setChanged()', function () {
        it('sets Observable state to changed', function () {
          this.subject.setChanged();
          expect(this.subject._hasChanged).toBe(true);
        });
        
        itBehavesLikeChainableMethod('setChanged');
      });
      
      describe('.hasChanged()', function () {
        it('returns true if Observable state was changed', function () {
          expect(this.subject.hasChanged()).toBe(false);
          this.subject.setChanged();
          expect(this.subject.hasChanged()).toBe(true);
        });
      });
      
      describe('.clearChanged()', function () {
        it('sets Observable state to not changed', function () {
          this.subject.setChanged();
          this.subject.clearChanged();
          
          expect(this.subject.hasChanged()).toBe(false);
        });
        
        itBehavesLikeChainableMethod('clearChanged');
      });
      
      describe('.addObserver(observer)', function () {
        it('add callback to the array of observers', function () {
          var observer = function () {};
          this.subject.addObserver(observer);
          expect(this.subject.observersCount).toBe(1);
        });
        
        itBehavesLikeChainableMethod('addObserver');
      });
      
      describe('.removeObserver(observer)', function () {
        it('removes observer from observers list', function () {
          var observer = function () {};
          
          this.subject.addObserver(observer);
          this.subject.addObserver(observer);
          this.subject.addObserver(observer);
          
          this.subject.removeObserver(observer);
          
          expect(this.subject.observersCount).toBe(0);
        });
        
        itBehavesLikeChainableMethod('removeObserver');
      });
      
      describe('.notifyObservers(data)', function () {
        beforeEach(function () {
          this.test = {
            observer: new Function(),
            data: 10
          };
          
          spyOn(this.test, 'observer');
        });
        
        itBehavesLikeChainableMethod('notifyObservers');
        
        it('does not invoke observers if state was not changed', function () {
          this.subject.addObserver(this.test.observer);
          this.subject.clearChanged();
          this.subject.notifyObservers();
          
          expect(this.test.observer).not.toHaveBeenCalled();
        });
        
        it('invokes all observers with passed data', function () {
          this.subject.addObserver(this.test.observer);
          this.subject.setChanged();
          this.subject.notifyObservers(this.test.data);
          
          expect(this.test.observer).toHaveBeenCalledWith(this.test.data);
        });
      });
    });
  });
})();