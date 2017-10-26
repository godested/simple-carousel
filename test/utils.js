;(function () {
  var resource = 'src/utils';

  define([resource], function (utils) {
    describe(resource, function () {
      describe('.isObject(value)', function () {
        it('returns true when value is an object', function () {
          expect(utils.isObject({})).toBe(true);
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

          expect(nonObjectValues.every(utils.isObject)).toBe(false);
        });
      });
    });
  });
})();