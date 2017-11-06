define(['views/carousel'], function (CarouselView) {
  var carousel = new CarouselView();
  var container = document.querySelector('.container');
  
  for (var i = 1; i <= 5; i++) {
    carousel.model.addItem('http://via.placeholder.com/350x350?text=placeholder ' + i);
  }
  
  return {
    start: function () {
      if (container !== null) {
        container.appendChild(carousel.render().el);
      }
    }
  }
});