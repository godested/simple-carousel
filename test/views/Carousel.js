(function () {
  var resource = 'src/views/carousel';
  var testItem = 'http://via.placeholder.com/350x350?text=placeholder';

  define([resource, 'test/helpers'], function (CarouselView, helpers) {
    describe(resource, function () {
      beforeEach(function () {
        this.subject = new CarouselView();
        this.sandboxContainer = document.querySelector('#sandbox');
        this.sandboxContainer.innerHTML = '';
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
          for (var i = 0; i < 5; i++) {
            this.subject.model.addItem(testItem);
          }

          this.sandboxContainer.appendChild(this.subject.render().el);
        });

        it('sets correct sizes of slides list', function () {
          var expectedWidth = this.subject.viewBox.offsetWidth * this.subject.getSlidesCount();
          expect(this.subject.slidesList.offsetWidth).toEqual(expectedWidth);
        });

        it('sets correct size of each slides list item', function () {
          var listItems = [].slice.call(this.subject.slidesList.children);
          var expectedWidth = this.subject.slidesList.offsetWidth / this.subject.getSlidesCount();

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
          this.subject.model.addItem(testItem);
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
        beforeEach(function () {
          this.subject.createLayout();
        });
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

      describe('Slides:', function () {
        beforeEach(function () {
          for (var i = 0; i < 7; i++) {
            this.subject.model.addItem(testItem);
          }

          this.sandboxContainer.appendChild(this.subject.render().el);
        });

        describe('.getSlidesCount', function () {
          it('returns count of carousel model items', function () {
            expect(this.subject.getSlidesCount()).toEqual(this.subject.getSlidesCount());
          });
        });

        describe('.slideNext()', function () {
          itBehavesLikeChainableMethod('slideNext');

          it('increments currentSlide', function () {
            this.subject.slideNext();
            expect(this.subject.currentSlide).toBe(1);
          });

          it('sets current slide to 0 in case it is greater than last item index', function () {
            this.subject.currentSlide = this.subject.getSlidesCount() - 1;
            this.subject.slideNext();

            expect(this.subject.currentSlide).toBe(0);
          });

          it('calls recalculate() method', function () {
            spyOn(this.subject, 'recalculate');
            this.subject.slideNext();
            expect(this.subject.recalculate).toHaveBeenCalled()
          });
        });

        describe('.slidePrevious()', function () {
          itBehavesLikeChainableMethod('slidePrevious');

          it('decrements currentSlide', function () {
            this.subject.currentSlide = 1;
            this.subject.slidePrevious();
            expect(this.subject.currentSlide).toBe(0);
          });

          it('sets current slide to last item index in case it less than 0', function () {
            this.subject.slidePrevious();
            expect(this.subject.currentSlide).toBe(this.subject.getSlidesCount() - 1);
          });

          it('calls recalculate() method', function () {
            spyOn(this.subject, 'recalculate');
            this.subject.slidePrevious();
            expect(this.subject.recalculate).toHaveBeenCalled()
          });
        });

        describe('.recalculate()', function () {
          itBehavesLikeChainableMethod('recalculate');

          it('calculates position of slidesList', function () {
            this.subject.recalculate();
            this.subject.currentSlide = 2;
            this.subject.recalculate();
            var left = parseInt(this.subject.slidesList.style.left) || 0;

            expect(left).toEqual(-this.subject.viewBox.offsetWidth * this.subject.currentSlide);
          });
        });
      });
    });
  });
})();