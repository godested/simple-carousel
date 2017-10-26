window.itBehavesLikeChainableMethod = function (methodName) {
  it('it chainable method', function () {
    expect(this.subject[methodName].call(this.subject)).toBe(this.subject);
  });
};