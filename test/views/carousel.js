var resource = 'src/views/carousel';

var expectToCreateDOMElement = function (node) {
  expect(node).toBeDefined();
  expect(node instanceof HTMLElement).toBe(true);
};

define([resource], function (CarouselView) {
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
        expectToCreateDOMElement(this.carouselView.el);
      });

      it('creates next button', function () {
        expectToCreateDOMElement(this.carouselView.btnNext);
      });

      it('creates previous button', function () {
        expectToCreateDOMElement(this.carouselView.btnPrev);
      });

      it('creates viewBox', function () {
        expectToCreateDOMElement(this.carouselView.viewBox);
      });

      it('creates slidesList', function () {
        expectToCreateDOMElement(this.carouselView.slidesList);
      });
    });

    describe('.assignClassNames', function () {
      beforeEach(function () {
        this.carouselView.createLayout().assignClassNames();
      });

      it('assigns correct classNames to elements', function () {
        var ownProps = Object.getOwnPropertyNames(this.carouselView);
        ownProps.forEach(function (propName) {
          var property = this.carouselView[propName];
          var expectedClassName = this.carouselView.classNames[propName] || '';

          if (property instanceof HTMLElement && expectedClassName) {
            expect(property.className).toEqual(expectedClassName);
          }
        }.bind(this));
      });
    });
  });
});