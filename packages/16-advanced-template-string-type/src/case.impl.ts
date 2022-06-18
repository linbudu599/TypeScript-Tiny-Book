import { expectType } from 'tsd';

type Delimiters = '-' | '_' | ' ';

type CapitalizeStringArray<Words extends any[]> = Words extends [
  `${infer First}`,
  ...infer Rest
]
  ? `${Capitalize<First>}${CapitalizeStringArray<Rest>}`
  : '';

type CamelCaseStringArray<Words extends string[]> = Words extends [
  `${infer First}`,
  ...infer Rest
]
  ? `${First}${CapitalizeStringArray<Rest>}`
  : never;

export type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : S extends Delimiter
  ? []
  : [S];

type CamelCase<K extends string> = CamelCaseStringArray<Split<K, Delimiters>>;

expectType<CamelCase<'foo-bar-baz'>>('fooBarBaz');
expectType<CamelCase<'foo bar baz'>>('fooBarBaz');
expectType<CamelCase<'foo_bar_baz'>>('fooBarBaz');
