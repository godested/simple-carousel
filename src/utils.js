define(function () {

  return {
    isObject: function (value) {
      return typeof value === 'object' && !Array.isArray(value) && value !== null;
    },
    extend: function (ChildClass, ParentClass) {
      ChildClass.prototype = Object.create(ParentClass.prototype);
      ChildClass.prototype.constructor = ChildClass;
      ChildClass.superClass = ParentClass;
    }
  };
});