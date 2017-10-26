define(function () {

  return {
    isObject: function (value) {
      return typeof value === 'object' && !Array.isArray(value) && value !== null;
    }
  };
});