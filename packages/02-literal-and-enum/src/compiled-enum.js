'use strict';
var Items;
(function (Items) {
  Items[(Items['Foo'] = 0)] = 'Foo';
  Items[(Items['Bar'] = 1)] = 'Bar';
  Items[(Items['Baz'] = 2)] = 'Baz';
})(Items || (Items = {}));
