import { expectType } from 'tsd';

type Conditional<Value, Condition, Resolved, Rejected> = Value extends Condition
  ? Resolved
  : Rejected;

export type ValueTypeFilter<
  T extends object,
  ValueType,
  Positive extends boolean
> = {
  [Key in keyof T]-?: T[Key] extends ValueType
    ? Conditional<Positive, true, Key, never>
    : Conditional<Positive, true, never, Key>;
}[keyof T];

export type PickByValueType<T extends object, ValueType> = Pick<
  T,
  ValueTypeFilter<T, ValueType, true>
>;

export type OmitByValueType<T extends object, ValueType> = Pick<
  T,
  ValueTypeFilter<T, ValueType, false>
>;

type _StrictConditional<Value, Condition, Resolved, Rejected> = [
  Value
] extends [Condition]
  ? Resolved
  : Rejected;

type _Res1 = _StrictConditional<1 | 2, 1 | 2 | 3, true, false>; // true

type StrictConditional<A, B, Resolved, Rejected, Fallback = never> = [
  A
] extends [B]
  ? [B] extends [A]
    ? Resolved
    : Rejected
  : Fallback;

type Res1 = StrictConditional<1 | 2, 1 | 2 | 3, true, false>; // false
type Res2 = StrictConditional<1 | 2 | 3, 1 | 2, true, false, false>; // false
type Res3 = StrictConditional<1 | 2, 1 | 2, true, false>; // true

export type StrictValueTypeFilter<
  T extends object,
  ValueType,
  Positive extends boolean = true
> = {
  [Key in keyof T]-?: StrictConditional<
    ValueType,
    T[Key],
    // 为了避免嵌套太多工具类型，这里就不使用 Conditional 了
    Positive extends true ? Key : never,
    Positive extends true ? never : Key,
    Positive extends true ? never : Key
  >;
}[keyof T];

export type StrictPickByValueType<T extends object, ValueType> = Pick<
  T,
  StrictValueTypeFilter<T, ValueType>
>;

expectType<
  StrictPickByValueType<{ foo: 1; bar: 1 | 2; baz: 1 | 2 | 3 }, 1 | 2>
>({
  bar: 1,
});

export type StrictOmitByValueType<T extends object, ValueType> = Pick<
  T,
  StrictValueTypeFilter<T, ValueType, false>
>;

expectType<
  StrictOmitByValueType<{ foo: 1; bar: 1 | 2; baz: 1 | 2 | 3 }, 1 | 2>
>({
  foo: 1,
  baz: 3,
});
