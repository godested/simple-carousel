window.itBehavesLikeChainableMethod = function (methodName) {
  it('is chainable method', function () {
    expect(this.subject[methodName].call(this.subject)).toBe(this.subject);
  });
};