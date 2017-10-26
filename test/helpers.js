define(function () {
  return {
    expectToHaveDOMElement: function (node) {
      expect(node).toBeDefined();
      expect(node instanceof HTMLElement).toBe(true);
    },
    itBehavesLikeChainableMethod: function (methodName) {
      spyOn(this.subject, methodName).and.returnValue(this.subject);
    }
  };
});