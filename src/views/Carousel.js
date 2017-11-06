define(['src/models/Carousel', 'text!src/templates/carousel.html', 'src/utils'],
  function (CarouselModel, carouselTemplate, utils) {
    var getDefaultSettings = function () {
      return {
        template: carouselTemplate,
        model: new CarouselModel()
      };
    };

    var CarouselView = function CarouselView(settings) {
      settings = utils.isObject(settings) ? settings : getDefaultSettings();

      this.el = null;

      this.btnNext = null;
      this.btnPrev = null;

      this.viewBox = null;

      this.slidesList = null;

      this.template = settings.template;
      this.model = settings.model;

      this.currentSlide = 0;

      this.updateContent = this.updateContent.bind(this);
      this.slideNext = this.slideNext.bind(this);
      this.slidePrevious = this.slidePrevious.bind(this);

      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);

      this._lastMouse = {
        clientX: 0,
        clientY: 0
      };
    };

    CarouselView.prototype.classNames = {
      el: 'carousel',
      slidesListMoving: 'carousel-slides-list-moving'
    };

    CarouselView.prototype.createLayout = function () {
      this.el = document.createElement('div');
      this.el.className = this.classNames.el;

      this.el.innerHTML = this.template;


      return this.collectChildNodes();
    };

    CarouselView.prototype.getSlidesCount = function () {
      return this.model.items.length;
    };

    CarouselView.prototype.updateDimensions = function () {
      this.slidesList.style.width = (this.model.items.length * 100) + '%';

      var childElements = [].slice.call(this.slidesList.children);

      childElements.forEach(function (child) {
        child.style.width = ['calc(100%/', childElements.length, ')'].join('');
      }.bind(this));

      return this;
    };

    CarouselView.prototype.updateContent = function () {
      this.slidesList.innerHTML = this.model.items.map(function (item) {
        return this.createSlide(item);
      }.bind(this)).join('');


      return this.updateDimensions();
    };

    CarouselView.prototype.createSlide = function (item) {
      return [
        '<li class="carousel-slides-list-item">',
        '<img src="' + item + '" />',
        '</li>'
      ].join('');
    };

    CarouselView.prototype.getSlidesListLeftPosition = function () {
      return parseInt(this.slidesList.style.left) || 0;
    };

    CarouselView.prototype.recalculate = function () {
      this.slidesList.style.left = -1 * this.viewBox.offsetWidth * this.currentSlide + 'px';
      return this;
    };

    CarouselView.prototype.slideNext = function () {
      this.currentSlide = (this.currentSlide + 1) % this.getSlidesCount();
      return this.recalculate();
    };

    CarouselView.prototype.slidePrevious = function () {
      if (this.currentSlide === 0) {
        this.currentSlide = this.getSlidesCount();
      }

      this.currentSlide -= 1;
      return this.recalculate();
    };

    CarouselView.prototype.handleMouseDown = function () {
      this.viewBox.addEventListener('mousedown', function (event) {
        event.preventDefault();
        this.slidesList.classList.add(this.classNames.slidesListMoving);

        this._lastMouse.clientX = event.clientX;
        this._lastMouse.clientY = event.clientY;

        document.addEventListener('mousemove', this.handleMouseMove);
      }.bind(this));
      return this;
    };

    CarouselView.prototype.handleMouseUp = function () {
      document.addEventListener('mouseup', function (event) {
        event.preventDefault();
        this.slidesList.classList.remove(this.classNames.slidesListMoving);
        document.removeEventListener('mousemove', this.handleMouseMove);

        this.setClosesSlide().recalculate();
      }.bind(this));
      return this;
    };

    CarouselView.prototype.setClosesSlide = function () {
      var left = this.getSlidesListLeftPosition();

      this.currentSlide = -1 * Math.round(left / this.viewBox.offsetWidth);

      if (left > 0) {
        this.currentSlide = 0;
      }

      this.currentSlide = Math.min(this.currentSlide, this.getSlidesCount() - 1);

      return this;
    };

    CarouselView.prototype.handleMouseMove = function (event) {
      event.preventDefault();
      var left = this.getSlidesListLeftPosition();
      left -= this._lastMouse.clientX - event.clientX;

      this._lastMouse.clientX = event.clientX;
      this._lastMouse.clientY = event.clientY;

      this.slidesList.style.left = left + 'px';
      return this;
    };

    CarouselView.prototype.delegateEvents = function () {
      this.model.addObserver(this.updateContent);

      this.btnNext.addEventListener('click', this.slideNext);
      this.btnPrev.addEventListener('click', this.slidePrevious);

      this.handleMouseDown().handleMouseUp();
      return this;
    };


    CarouselView.prototype.collectChildNodes = function () {
      this.btnNext = this.el.querySelector('.carousel-btn-next');
      this.btnPrev = this.el.querySelector('.carousel-btn-prev');

      this.viewBox = this.el.querySelector('.carousel-view-box');
      this.slidesList = this.el.querySelector('.carousel-slides-list');

      return this;
    };

    CarouselView.prototype.render = function () {
      this.createLayout();
      this.updateContent();
      this.delegateEvents();

      return this;
    };

    return CarouselView;
  });