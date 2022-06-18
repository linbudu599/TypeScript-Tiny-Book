import 'reflect-metadata';

@Reflect.metadata('class:key', 'METADATA_IN_CLASS')
class Foo {
  @Reflect.metadata('prop:key', 'METADATA_IN_PROPERTY')
  public prop: string = 'linbudu';

  @Reflect.metadata('method:key', 'METADATA_IN_METHOD')
  public handler(): void {}
}

const foo = new Foo();

// METADATA_IN_CLASS
console.log(Reflect.getMetadata('class:key', Foo));
// undefined
console.log(Reflect.getMetadata('class:key', Foo.prototype));

// METADATA_IN_METHOD
console.log(Reflect.getMetadata('method:key', Foo.prototype, 'handler'));
// METADATA_IN_METHOD
console.log(Reflect.getMetadata('method:key', foo, 'handler'));

// METADATA_IN_PROPERTY
console.log(Reflect.getMetadata('prop:key', Foo.prototype, 'prop'));
// METADATA_IN_PROPERTY
console.log(Reflect.getMetadata('prop:key', foo, 'prop'));
