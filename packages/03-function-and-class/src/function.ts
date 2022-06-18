function foo(name: string): number {
  return name.length;
}

const foo1 = function (name: string): number {
  return name.length;
};

const foo2: (name: string) => number = function (name) {
  return name.length;
};

const foo3 = (name: string): number => {
  return name.length;
};

const foo4: (name: string) => number = (name) => {
  return name.length;
};

type FuncFoo = (name: string) => number;

const foo5: FuncFoo = (name) => {
  return name.length;
};

interface FuncFooStruct {
  (name: string): number;
}
