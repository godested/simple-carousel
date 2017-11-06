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

      describe('.extend(ChildClass, ParentClass)', function () {
        it('implements inheritance', function () {
          var Parent = function () {};
          Parent.prototype.test = function () {return true;};
          var Child = function () {};
          utils.extend(Child, Parent);

          var childInstance = new Child();

          expect(childInstance instanceof Parent).toBe(true);
          expect(childInstance.test()).toBe(true);
        });
      });
    });
  });
})();