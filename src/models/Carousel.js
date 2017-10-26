define(['src/utils'], function (utils) {
  var defaultConfig = {
    items: []
  };
  var CarouselModel = function CarouselModel(config) {
    config = utils.isObject(config) ? config : defaultConfig;

    this.config = utils.isObject(config) || {};
    this.items = config.items;
  };

  return CarouselModel;
});