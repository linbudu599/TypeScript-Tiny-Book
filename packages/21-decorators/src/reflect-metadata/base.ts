import 'reflect-metadata';

class Foo {
  handler() {}
}

Reflect.defineMetadata('class:key', 'class metadata', Foo);
Reflect.defineMetadata('method:key', 'handler metadata', Foo, 'handler');
Reflect.defineMetadata(
  'proto:method:key',
  'proto handler metadata',
  Foo.prototype,
  'handler'
);

// [ 'class:key' ]
console.log(Reflect.getMetadataKeys(Foo));
// ['method:key']
console.log(Reflect.getMetadataKeys(Foo, 'handler'));
// ['proto:method:key'];
console.log(Reflect.getMetadataKeys(Foo.prototype, 'handler'));

// class metadata
console.log(Reflect.getMetadata('class:key', Foo));
// handler metadata
console.log(Reflect.getMetadata('method:key', Foo, 'handler'));
// proto handler metadata
console.log(Reflect.getMetadata('proto:method:key', Foo.prototype, 'handler'));
