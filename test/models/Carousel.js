(function () {
  var resource = 'src/models/Carousel';
  define([resource, 'src/errors'], function (CarouselModel, errors) {
    describe(resource, function () {
      beforeEach(function () {
        this.subject = new CarouselModel();
      });
      
      it('should be defined', function () {
        expect(CarouselModel).toBeDefined();
      });
      
      describe('.items', function () {
        it('returns model items', function () {
          var items = this.subject.items;
          expect(items).toBe(this.subject._items);
        });
      });
      
      describe('.items=', function () {
        it('sets models items', function () {
          var items = ['test'];
          this.subject.items = items;
          
          expect(this.subject._items).toEqual(items);
        });
        
        it('notifies observers with passed items', function () {
          var test = {
            observer: function () {}
          };
          
          spyOn(test, 'observer');
          
          this.subject.addObserver(test.observer);
          
          this.subject.items = [1, 2, 3];
          
          expect(test.observer).toHaveBeenCalledWith(this.subject.items);
        });
        
        it('throws exception if passed value is not an array', function () {
          expect(function () {
            this.subject.items = 10;
          }.bind(this)).toThrow(new TypeError(errors.TYPE_ERROR.ARRAY_EXPECTED));
        });
      });
      
      describe('.addItem(item)', function () {
        it('adds item to the model items array', function () {
          this.subject.addItem('someItem');
          expect(this.subject.items.length).toBe(1);
        });
        
        itBehavesLikeChainableMethod('addItem');
        
        it('notifies observers with passed items', function () {
          var test = {
            observer: function () {}
          };
          
          spyOn(test, 'observer');
          
          this.subject.addObserver(test.observer);
          
          this.subject.addItem('item');
          
          expect(test.observer).toHaveBeenCalledWith(this.subject.items);
        });
      });
    });
  });
})();