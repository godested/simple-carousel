define(['src/util/Observable', 'src/utils', 'src/errors'], function (Observable, utils, errors) {
  var defaultConfig = {
    items: []
  };
  
  var CarouselModel = function CarouselModel(config) {
    CarouselModel.superClass.call(this);
    
    config = utils.isObject(config) ? config : defaultConfig;
    
    this.config = utils.isObject(config) || {};
    this.items = config.items;
  };
  
  utils.extend(CarouselModel, Observable);
  
  Object.defineProperty(CarouselModel.prototype, 'items', {
    get: function () {
      return this._items;
    },
    set: function (value) {
      if (!Array.isArray(value)) {
        throw new TypeError(errors.TYPE_ERROR.ARRAY_EXPECTED)
      }
      
      this._items = value;
      this.setChanged().notifyObservers(this.items);
    }
  });
  
  CarouselModel.prototype.addItem = function (item) {
    this.items.push(item);
    
    this.setChanged().notifyObservers(this.items);
    
    return this;
  };
  
  return CarouselModel;
});