import { expectType } from 'tsd';

type FuncStruct = (...args: any[]) => any;

type _FunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends FuncStruct ? K : never;
}[keyof T];

type Tmp<T extends object> = {
  [K in keyof T]: T[K] extends FuncStruct ? K : never;
};

type Res = Tmp<{
  foo: () => void;
  bar: () => number;
  baz: number;
}>;

type ResEqual = {
  foo: 'foo';
  bar: 'bar';
  baz: never;
};

type WhatWillWeGet = Res[keyof Res]; // "foo" | "bar"

type WhatWillWeGetEqual1 = Res['foo' | 'bar' | 'baz'];
type WhatWillWeGetEqual2 = Res['foo'] | Res['bar'] | Res['baz'];
type WhatWillWeGetEqual3 = 'foo' | 'bar' | never;

type ExpectedPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? Key : never;
}[keyof T];

type FunctionKeys<T extends object> = ExpectedPropKeys<T, FuncStruct>;

expectType<
  FunctionKeys<{
    foo: () => void;
    bar: () => number;
    baz: number;
  }>
>('foo');

expectType<
  FunctionKeys<{
    foo: () => void;
    bar: () => number;
    baz: number;
  }>
  // 报错，因为 baz 不是函数类型属性
  // @ts-expect-error
>('baz');

export type PickByValueType<T extends object, ValueType> = Pick<
  T,
  ExpectedPropKeys<T, ValueType>
>;

expectType<PickByValueType<{ foo: string; bar: number }, string>>({
  foo: 'linbudu',
});

expectType<
  PickByValueType<{ foo: string; bar: number; baz: boolean }, string | number>
>({
  foo: 'linbudu',
  bar: 599,
});

type FilteredPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? never : Key;
}[keyof T];

export type OmitByValueType<T extends object, ValueType> = Pick<
  T,
  FilteredPropKeys<T, ValueType>
>;

expectType<OmitByValueType<{ foo: string; bar: number }, string>>({
  bar: 599,
});

expectType<
  OmitByValueType<{ foo: string; bar: number; baz: boolean }, string | number>
>({
  baz: true,
});
