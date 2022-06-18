import { expectType } from 'tsd';

type SnakeCase2CamelCase<S extends string> =
  S extends `${infer Head}${'_'}${infer Rest}`
    ? `${Head}${SnakeCase2CamelCase<Capitalize<Rest>>}`
    : S;

expectType<SnakeCase2CamelCase<'foo_bar_baz'>>('fooBarBaz');

type KebabCase2CamelCase<S extends string> =
  S extends `${infer Head}${'-'}${infer Rest}`
    ? `${Head}${KebabCase2CamelCase<Capitalize<Rest>>}`
    : S;

expectType<KebabCase2CamelCase<'foo-bar-baz'>>('fooBarBaz');

type DelimiterCase2CamelCase<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Rest}`
  ? `${Head}${DelimiterCase2CamelCase<Capitalize<Rest>, Delimiter>}`
  : S;

expectType<DelimiterCase2CamelCase<'foo-bar-baz', '-'>>('fooBarBaz');
expectType<DelimiterCase2CamelCase<'foo~bar~baz', '~'>>('fooBarBaz');
expectType<DelimiterCase2CamelCase<'foo bar baz', ' '>>('fooBarBaz');
