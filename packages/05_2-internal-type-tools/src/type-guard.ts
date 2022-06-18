function isString(input: unknown): boolean {
  return typeof input === 'string';
}

function foo(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    input.replace('linbudu', 'linbudu599');
  }
  if (typeof input === 'number') {
  }
  // ...
}

function _isString(input: unknown): input is string {
  return typeof input === 'string';
}

function _foo(input: string | number) {
  if (_isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    input.replace('linbudu', 'linbudu599');
  }
  if (typeof input === 'number') {
  }
  // ...
}

export type Falsy = false | '' | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;

// 不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;

export const isPrimitive = (val: unknown): val is Primitive =>
  ['string', 'number', 'boolean', 'undefined'].includes(typeof val);

interface Foo {
  foo: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  bar: string;
  barOnly: boolean;
  shared: number;
}

function handle(input: Foo | Bar) {
  if ('foo' in input) {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}

function _handle(input: Foo | Bar) {
  if ('shared' in input) {
    // 类型“Foo | Bar”上不存在属性“fooOnly”。类型“Bar”上不存在属性“fooOnly”。
    input.fooOnly;
  } else {
    // 类型“never”上不存在属性“barOnly”。
    input.barOnly;
  }
}
