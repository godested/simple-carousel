define(['utils'], function (utils) {
  var CarouselModel = function (config) {
    this.config = utils.isObject(config) || {};
    this.items = [];
  };

  return CarouselModel;
});