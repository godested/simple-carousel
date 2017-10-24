define([], function () {
  var CarouselView = function CarouselView() {
    this.el = null;

    this.btnNext = null;
    this.btnPrev = null;

    this.viewBox = null;

    this.slidesList = null;
  };

  CarouselView.prototype.classNames = {
    el: 'carousel',
    btnNext: 'carousel-btn-next',
    btnPrev: 'carousel-btn-prev',
    viewBox: 'carousel-view-box',
    slidesList: 'carousel-slides-list'
  };

  CarouselView.prototype.createLayout = function () {
    this.el = document.createElement('div');

    this.btnNext = document.createElement('button');
    this.btnPrev = document.createElement('button');

    this.viewBox = document.createElement('div');

    this.slidesList = document.createElement('ul');
    this.viewBox.appendChild(this.slidesList);

    this.el.appendChild(this.btnNext);
    this.el.appendChild(this.viewBox);
    this.el.appendChild(this.btnPrev);
    return this;
  };

  CarouselView.prototype.assignClassNames = function () {
    var ownPropertyNames = Object.getOwnPropertyNames(this);

    ownPropertyNames.forEach(function (propName) {
      var node = this[propName];
      var expectedClass = this.classNames[propName];

      if (typeof expectedClass === 'string') {
        node.className = expectedClass;
      }
    }.bind(this));

    return this;
  };

  CarouselView.prototype.render = function () {
    return this.createLayout().assignClassNames();
  };

  return CarouselView;
});