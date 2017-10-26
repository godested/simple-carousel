define(['src/util/Observable', 'src/utils'], function (Observable, utils) {
  var defaultConfig = {
    items: []
  };
  
  var CarouselModel = function CarouselModel(config) {
    config = utils.isObject(config) ? config : defaultConfig;
    
    this.config = utils.isObject(config) || {};
    this._items = config.items;
    
    CarouselModel.superClass.call(this);
  };
  
  utils.extend(CarouselModel, Observable);
  
  Object.defineProperty(CarouselModel.prototype, 'items', {
    get: function () {
      return this._items;
    }
  });
  
  CarouselModel.prototype.addItem = function (item) {
    this.items.push(item);
    
    return this;
  };
  
  return CarouselModel;
});