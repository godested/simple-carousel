define(function () {
  return {
    expectToHaveDOMElement: function (node) {
      expect(node).toBeDefined();
      expect(node instanceof HTMLElement).toBe(true);
    }
  };
});