var resource = 'src/models/carousel';
define([resource], function (CarouselModel) {
  describe(resource, function () {
    it('should be defined', function () {
      expect(CarouselModel).toBeDefined();
    });
  });
});