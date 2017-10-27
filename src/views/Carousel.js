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

      this.updateContent = this.updateContent.bind(this);
    };

    CarouselView.prototype.classNames = {
      el: 'carousel'
    };

    CarouselView.prototype.createLayout = function () {
      this.el = document.createElement('div');
      this.el.className = this.classNames.el;

      this.el.innerHTML = this.template;


      return this.collectChildNodes();
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

    CarouselView.prototype.delegateEvents = function () {
      this.model.addObserver(this.updateContent);
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