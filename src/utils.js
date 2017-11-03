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
      }
  };
});