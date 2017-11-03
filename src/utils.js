define(function () {

  return {
    isObject: function (value) {
      return typeof value === 'object' && !Array.isArray(value) && value !== null;
    },
    extend: function (ChildClass, ParentClass) {
      ChildClass.prototype = Object.create(ParentClass.prototype);
      ChildClass.prototype.constructor = ChildClass;
      ChildClass.superClass = ParentClass;
    },
    isTouchDevice: function () {
        return ('ontouchstart' in window);
    },
      getEventCoordinate: function (event) {
        return {
            x: (this.isTouchDevice()) ? event.touches[0].clientX : event.clientX,
            y: (this.isTouchDevice()) ? event.touches[0].clientY : event.clientY
        }
      },
      wheelType: function (){
              if (this.addEventListener) {
                  if ('onwheel' in document) {
                      // IE9+, FF17+, Ch31+
                      return "wheel";
                  } else if ('onmousewheel' in document) {
                      // устаревший вариант события
                      return "mousewheel";
                  } else {
                      // Firefox < 17
                      return "MozMousePixelScroll"
                  }
              } else { // IE8-
                  return "onmousewheel";
              }
      }
  };
});