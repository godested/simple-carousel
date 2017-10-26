;(function () {
  var resource = 'src/utils';

  define([resource], function (utils) {
    describe(resource, function () {
      describe('.isObject(value)', function () {
        it('returns true when value is an object', function () {
          expect(utils.isObject({
            testProp: 10
          })).toBe(true);
        });

        it('returns false when value is not an object', function () {
          var nonObjectValues = [
            new Function(),
            [],
            null,
            undefined,
            '',
            12,
            true
          ];

          expect(nonObjectValues.every(function (value) {
            return utils.isObject(value) === false;
          })).toBe(true);
        });
      });
    });
  });
})();