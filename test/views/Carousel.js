(function () {
  var resource = 'src/views/carousel';

  define([resource, 'test/helpers'], function (CarouselView, helpers) {
    describe(resource, function () {
      beforeEach(function () {
        this.subject = new CarouselView();
      });

      it('should be defined', function () {
        expect(CarouselView).toBeDefined();
      });

      describe('.createLayout()', function () {
        beforeEach(function () {
          this.subject.createLayout();
        });

        itBehavesLikeChainableMethod('createLayout');

        it('creates a root element of the view', function () {
          helpers.expectToHaveDOMElement(this.subject.el);
        });

        it('creates next button', function () {
          helpers.expectToHaveDOMElement(this.subject.btnNext);
        });

        it('creates previous button', function () {
          helpers.expectToHaveDOMElement(this.subject.btnPrev);
        });

        it('creates viewBox', function () {
          helpers.expectToHaveDOMElement(this.subject.viewBox);
        });

        it('creates slidesList', function () {
          helpers.expectToHaveDOMElement(this.subject.slidesList);
        });
      });

      describe('.updateDimensions()', function () {
        beforeEach(function () {
          this.sandboxContainer = document.querySelector('#sandbox');
          this.sandboxContainer.innerHTML = '';

          for (var i = 0; i < 5; i++) {
            this.subject.model.addItem('http://via.placeholder.com/350x350?text=placeholder');
          }

          this.sandboxContainer.appendChild(this.subject.render().el);
        });

        it('sets correct sizes of slides list', function () {
          var expectedWidth = this.subject.viewBox.offsetWidth * this.subject.model.items.length;
          expect(this.subject.slidesList.offsetWidth).toEqual(expectedWidth);
        });

        it('sets correct size of each slides list item', function () {
          var listItems = [].slice.call(this.subject.slidesList.children);
          var expectedWidth = this.subject.slidesList.offsetWidth / this.subject.model.items.length;

          expect(listItems.every(function (item) {
            return item.offsetWidth === expectedWidth;
          }.bind(this))).toBe(true);
        });

        itBehavesLikeChainableMethod('updateDimensions');
      });

      describe('.updateContent()', function () {
        beforeEach(function () {
          this.subject.createLayout();
        });

        it('update content of slides list', function () {
          this.subject.model.addItem('http://via.placeholder.com/350x350?text=placeholder ');
          this.subject.updateContent();

          expect(this.subject.slidesList.children.length).toBeGreaterThan(0);
        });

        it('calls updateDimensions method', function () {
          spyOn(this.subject, 'updateDimensions');
          this.subject.createLayout().updateContent();

          expect(this.subject.updateDimensions).toHaveBeenCalled();
        });

        itBehavesLikeChainableMethod('updateContent');
      });

      describe('.delegateEvents()', function () {
        itBehavesLikeChainableMethod('delegateEvents');

        it('sets .updateContent() as model observer', function () {
          this.subject.delegateEvents();
          expect(this.subject.model._observers.indexOf(this.subject.updateContent)).toBeGreaterThan(-1);
        });
      });

      describe('.render()', function () {
        itBehavesLikeChainableMethod('render');

        it('invokes .createLayout(), updateContent() and delegateEvents() methods', function () {
          var methodNames = ['createLayout', 'updateContent', 'delegateEvents'];

          methodNames.forEach(function (methodName) {
            spyOn(this.subject, methodName);
          }.bind(this));

          this.subject.render();

          methodNames.forEach(function (methodName) {
            expect(this.subject[methodName]).toHaveBeenCalled();
          }.bind(this));
        });
      });
    });
  });
})();