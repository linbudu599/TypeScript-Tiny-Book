type ClassStruct<T = any> = new (...args: any[]) => T;

type RestrictedClassDecorator<TClass extends object> = (
  target: ClassStruct<TClass>
) => ClassStruct<TClass> | void;

function OnlyFoo(): RestrictedClassDecorator<Foo> {
  return (target: ClassStruct<Foo>) => {};
}

function OnlyBar(): RestrictedClassDecorator<Bar> {
  return (target: ClassStruct<Bar>) => {};
}

@OnlyFoo()
@OnlyBar()
class Foo {
  foo!: string;
}

@OnlyFoo()
class DerivedFoo extends Foo {
  foo!: string;
}

@OnlyFoo()
@OnlyBar()
class Bar {
  bar!: string;
}

export {};
