class Foo {
  // @HijackGetter()
  get value() {
    return 'linbudu';
  }

  @HijackSetter('LIN_BU_DU')
  set value(input: string) {
    this.value = input;
  }
}

function HijackGetter(): MethodDecorator {
  return (_target, methodIdentifier, descriptor: any) => {
    const originalGetter = descriptor.get;
    descriptor.get = function () {
      // originalGetter.call(this, `THIS IS MODIFIED`);
      return 'LINBUDU';
    };
  };
}

function HijackSetter(val: string): MethodDecorator {
  return (target, methodIdentifier, descriptor: any) => {
    const originalGetter = descriptor.get;
    const originalSetter = descriptor.set;
    descriptor.set = function (newValue: string) {
      console.log(`HijackSetter: ${newValue}`);
      // return originalSetter.call(this, `THIS IS MODIFIED(${newValue})`);
      // console.log(target, target.prototype, methodIdentifier, descriptor);
    };
    // descriptor.get = function () {
    //   // originalGetter.call(this, `THIS IS MODIFIED`);
    //   return val;
    // };
  };
}

const foo = new Foo();
foo.value = 'LINBUDU';
// console.log(foo.value);

export {};
