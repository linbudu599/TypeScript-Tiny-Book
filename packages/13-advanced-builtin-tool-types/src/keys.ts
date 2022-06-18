import { expectType, expectNotType } from 'tsd';

type Tmp1 = {} extends { prop: number } ? 'Y' : 'N'; // "N"
type Tmp2 = {} extends { prop?: number } ? 'Y' : 'N'; // "Y"

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type Equal<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

export type MutableKeys<T extends object> = {
  [P in keyof T]-?: Equal<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P,
    never
  >;
}[keyof T];

expectType<MutableKeys<{ a: string; readonly b: string }>>('a');
expectNotType<MutableKeys<{ a: string; readonly b: string }>>('b');

export type ImmutableKeys<T extends object> = {
  [P in keyof T]-?: Equal<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];

expectType<ImmutableKeys<{ a: string; readonly b: string }>>('b');
expectNotType<ImmutableKeys<{ a: string; readonly b: string }>>('a');
