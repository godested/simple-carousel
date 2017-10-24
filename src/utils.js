define(function () {

  return {
    isObject: function (value) {
      return value === Object(value);
    }
  }
});