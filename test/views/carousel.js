(function () {
  var resource = 'src/views/carousel';

  define([resource, 'test/helpers'], function (CarouselView, helpers) {
    describe(resource, function () {
      beforeEach(function () {
        this.carouselView = new CarouselView();
      });

      it('should be defined', function () {
        expect(CarouselView).toBeDefined();
      });

      describe('.createLayout', function () {
        beforeEach(function () {
          this.carouselView.createLayout();
        });

        it('creates a root element of the view', function () {
          helpers.expectToHaveDOMElement(this.carouselView.el);
        });

        it('creates next button', function () {
          helpers.expectToHaveDOMElement(this.carouselView.btnNext);
        });

        it('creates previous button', function () {
          helpers.expectToHaveDOMElement(this.carouselView.btnPrev);
        });

        it('creates viewBox', function () {
          helpers.expectToHaveDOMElement(this.carouselView.viewBox);
        });

        it('creates slidesList', function () {
          helpers.expectToHaveDOMElement(this.carouselView.slidesList);
        });
      });
    });
  });
})();