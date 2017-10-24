define(['views/carousel'], function (CarouselView) {
  var carousel = new CarouselView();
  var container = document.querySelector('.container');

  return {
    start: function () {
      if (container !== null) {
        container.appendChild(carousel.render().el);
      }
    }
  }
});