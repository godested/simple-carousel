define(['src/models/Carousel', 'text!src/templates/carousel.html', 'src/utils', 'src/events'],
  function(CarouselModel, carouselTemplate, utils, events) {
    var getDefaultSettings = function() {
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

      this.isAnimationFinished = true;

      this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

      this.updateContent = this.updateContent.bind(this);
      this.slideNext = this.slideNext.bind(this);
      this.slidePrevious = this.slidePrevious.bind(this);

      this.handleKeyboardArrows = this.handleKeyboardArrows.bind(this);
      this.handleWheel = this.handleWheel.bind(this);
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

    CarouselView.prototype.createLayout = function() {
      this.el = document.createElement('div');
      this.el.className = this.classNames.el;

      this.el.innerHTML = this.template;


      return this.collectChildNodes();
    };

    CarouselView.prototype.getSlidesCount = function() {
      return this.model.items.length;
    };

    CarouselView.prototype.updateDimensions = function() {
      this.slidesList.style.width = (this.model.items.length * 100) + '%';

      var childElements = [].slice.call(this.slidesList.children);

      childElements.forEach(function(child) {
        child.style.width = ['calc(100%/', childElements.length, ')'].join('');
      }.bind(this));

      return this;
    };

    CarouselView.prototype.updateContent = function() {
      this.slidesList.innerHTML = this.model.items.map(function(item) {
        return this.createSlide(item);
      }.bind(this)).join('');


      return this.updateDimensions();
    };

    CarouselView.prototype.createSlide = function(item) {
      return [
        '<li class="carousel-slides-list-item">',
        '<img src="' + item + '" />',
        '</li>'
      ].join('');
    };

    CarouselView.prototype.getSlidesListLeftPosition = function() {
      return parseInt(this.slidesList.style.left) || 0;
    };

    CarouselView.prototype.recalculate = function() {
      this.slidesList.style.left = -1 * this.viewBox.offsetWidth * this.currentSlide + 'px';
      return this;
    };

    CarouselView.prototype.slideNext = function() {
      if(this.isAnimationFinished) {
        this.currentSlide = (this.currentSlide + 1) % this.getSlidesCount();
        this.isAnimationFinished = false;
      }
      return this.recalculate();
    };

    CarouselView.prototype.slidePrevious = function() {
      if(this.isAnimationFinished) {
        if (this.currentSlide === 0) {
          this.currentSlide = this.getSlidesCount();
        }
        this.currentSlide -= 1;
        this.isAnimationFinished = false;
      }
      return this.recalculate();
    };


    CarouselView.prototype.handleMouseDown = function(event) {
      event.preventDefault();
      this.slidesList.classList.add(this.classNames.slidesListMoving);
      this._lastMouse.clientX = utils.getEventCoordinate(event).x;
      this._lastMouse.clientY = utils.getEventCoordinate(event).y;
      document.addEventListener(events.movingMethod, this.handleMouseMove);
      return this;
    };

    CarouselView.prototype.handleMouseUp = function(event) {
      event.preventDefault();
      this.slidesList.classList.remove(this.classNames.slidesListMoving);
      document.removeEventListener(events.movingMethod, this.handleMouseMove);

      this.setClosesSlide().recalculate();

      return this;
    };

    CarouselView.prototype.handleTransitionEnd = function() {
      this.isAnimationFinished = true;
    };

    CarouselView.prototype.handleWheel = function(event) {
      if (!utils.isTouchDevice()) {
        event.preventDefault();
      }

      var delta = event.deltaY || event.detail || event.wheelDelta;

      delta > 0 ? this.slideNext() : this.slidePrevious();

      return this;
    };

    CarouselView.prototype.handleKeyboardArrows = function(event) {
      switch (event.keyCode) {
        case 39 : {
          event.preventDefault();
          this.slideNext();
          break;
        }
        case 37 : {
          event.preventDefault();
          this.slidePrevious();
          break;
        }
      }

      return this;
    };

    CarouselView.prototype.setClosesSlide = function() {
      var left = this.getSlidesListLeftPosition();

      this.currentSlide = -1 * Math.round(left / this.viewBox.offsetWidth);

      if (left > 0) {
        this.currentSlide = 0;
      }

      this.currentSlide = Math.min(this.currentSlide, this.getSlidesCount() - 1);

      return this;
    };

    CarouselView.prototype.handleMouseMove = function(event) {
      if (!utils.isTouchDevice()) {
        event.preventDefault();
      }
      var left = this.getSlidesListLeftPosition();

      left -= this._lastMouse.clientX - utils.getEventCoordinate(event).x;
      this._lastMouse.clientX = utils.getEventCoordinate(event).x;
      this._lastMouse.clientY = utils.getEventCoordinate(event).y;

      this.slidesList.style.left = left + 'px';
      return this;
    };

    CarouselView.prototype.delegateEvents = function() {
      this.model.addObserver(this.updateContent);

      this.viewBox.addEventListener(events.wheelType, this.handleWheel);
      this.viewBox.addEventListener(events.movingTypeStart, this.handleMouseDown);
      document.addEventListener(events.movingTypeEnd, this.handleMouseUp);

      this.viewBox.addEventListener('transitionend', this.handleTransitionEnd);
      document.addEventListener('keydown', this.handleKeyboardArrows);
      this.btnNext.addEventListener(events.clickMethod, this.slideNext);
      this.btnPrev.addEventListener(events.clickMethod, this.slidePrevious);

      return this;
    };


    CarouselView.prototype.collectChildNodes = function() {
      this.btnNext = this.el.querySelector('.carousel-btn-next');
      this.btnPrev = this.el.querySelector('.carousel-btn-prev');

      this.viewBox = this.el.querySelector('.carousel-view-box');
      this.slidesList = this.el.querySelector('.carousel-slides-list');

      return this;
    };

    CarouselView.prototype.render = function() {
      this.createLayout();
      this.updateContent();
      this.delegateEvents();

      return this;
    };

    return CarouselView;
  });