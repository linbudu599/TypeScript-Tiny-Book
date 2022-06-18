interface AllStringTypes {
  [key: string]: string;
}

type _AllStringTypes = {
  [key: string]: string;
};

type PropType1 = AllStringTypes['linbudu']; // string
type PropType2 = AllStringTypes['599']; // string

const foo: AllStringTypes = {
  linbudu: '599',
};

const _foo: AllStringTypes = {
  linbudu: '599',
  599: 'linbudu',
  [Symbol('ddd')]: 'symbol',
};

interface __AllStringTypes {
  // 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。
  propA: number;
  [key: string]: boolean;
}

interface AnyTypeHere {
  [key: string]: any;
}

const __foo: AnyTypeHere['linbudu'] = 'any value';

interface Foo {
  linbudu: 1;
  599: 2;
}

// "linbudu" | 599
type FooKeys = keyof Foo;

interface NumberRecord {
  [key: string]: number;
}

type PropType = NumberRecord[string]; // number

interface Foo {
  propA: number;
  propB: boolean;
}

type PropAType = Foo['propA']; // number
type PropBType = Foo['propB']; // boolean

interface Foo {
  propA: number;
  propB: boolean;
  propC: string;
}

// string | number | boolean
type PropTypeUnion = Foo[keyof Foo];
