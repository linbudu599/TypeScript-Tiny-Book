class Base {
  foo!: number;
}

class Foo {
  foo!: number;
}

class Bar extends Foo {
  bar!: number;
}

let f1: { (input: Foo): void } | { (input: Bar): void };
// 参数“input”隐式具有“any”类型。
f1 = (input) => {}; // y :any

let f2:
  | { (raw: number): (input: Foo) => void }
  | { (raw: number): (input: Bar) => void };

// raw → number
f2 = (raw) => {
  // input → Bar
  return (input) => {};
};

let f3: { (input: Foo | Bar): void };
// Foo | Bar
f3 = (input) => {}; // y :any
