class Foo {}

interface FooStruct {
  new (): Foo;
}

declare const NewableFoo: FooStruct;

const foo = new NewableFoo();

export {};
