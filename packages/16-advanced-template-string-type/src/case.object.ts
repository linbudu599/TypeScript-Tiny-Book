import { expectType } from 'tsd';
import { PlainObjectType, CamelCase } from './case.final';

export type CamelCasedProperties<T extends PlainObjectType> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends object
    ? CamelCasedProperties<T[K]>
    : T[K];
};

expectType<
  CamelCasedProperties<{ foo_bar: string; foo_baz: { nested_foo: string } }>
>({
  fooBar: '',
  fooBaz: {
    nestedFoo: '',
  },
});
