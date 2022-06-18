class Foo {
  static staticHandler() {}

  public instanceHandler() {}
}

// COMPILED
var _Foo = /** @class */ (function () {
  function Foo() {}
  Foo.staticHandler = function () {};
  Foo.prototype.instanceHandler = function () {};
  return Foo;
})();

export {};
