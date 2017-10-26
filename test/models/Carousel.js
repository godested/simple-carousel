(function () {
  var resource = 'src/models/carousel';
  define([resource], function (CarouselModel) {
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
      
      describe('.addItem(item)', function () {
        it('adds item to the model items array', function () {
          this.subject.addItem('someItem');
          expect(this.subject.items.length).toBe(1);
        });
        
        itBehavesLikeChainableMethod('addItem');
      });
    });
  });
})();