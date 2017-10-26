define(['src/models/Carousel', 'text!src/templates/carousel.html', 'src/utils'],
    function (CarouselModel, carouselTemplate, utils) {
      var defaultSettings = {
        template: carouselTemplate,
        model: new CarouselModel()
      };

      var CarouselView = function CarouselView(settings) {
        settings = utils.isObject(settings) ? settings : defaultSettings;

        this.el = null;

        this.btnNext = null;
        this.btnPrev = null;

        this.viewBox = null;

        this.slidesList = null;

        this.template = settings.template;
        this.model = settings.model;
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

      CarouselView.prototype.collectChildNodes = function () {
        this.btnNext = this.el.querySelector('.carousel-btn-next');
        this.btnPrev = this.el.querySelector('.carousel-btn-prev');

        this.viewBox = this.el.querySelector('.carousel-view-box');
        this.slidesList = this.el.querySelector('.carousel-view-box');

        return this;
      };

      CarouselView.prototype.render = function () {
        return this.createLayout();
      };

      return CarouselView;
    });