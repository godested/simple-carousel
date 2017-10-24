define([], function () {
  var CarouselView = function CarouselView() {
    this.el = document.createElement('div');
  };

  CarouselView.prototype.classNames = {
    el: 'carousel'
  };

  CarouselView.prototype.assignClassNames = function () {
    this.el.className = this.classNames.el;
    return this;
  };

  CarouselView.prototype.render = function () {
    return this.assignClassNames();
  };

  return CarouselView;
});