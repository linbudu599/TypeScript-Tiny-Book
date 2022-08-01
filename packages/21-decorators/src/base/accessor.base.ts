class Foo {
  _value!: string;

  get value() {
    return this._value;
  }

  @HijackSetter('LIN_BU_DU')
  set value(input: string) {
    this._value = input;
  }
}

function HijackSetter(val: string): MethodDecorator {
  return (target, methodIdentifier, descriptor: any) => {
    const originalSetter = descriptor.set.bind(target);
    descriptor.set = function (newValue: string) {
      const composed = `Raw: ${newValue}, Actual: ${val}-${newValue}`
      originalSetter(composed);
      console.log(`HijackSetter: ${composed}`);
    };
    // 篡改 getter，使得这个值无视 setter 的更新，返回一个固定的值
    // descriptor.get = function () {
    //   return val;
    // };
  };
}

const foo = new Foo();
foo.value = 'LINBUDU'; // HijackSetter: Raw: LINBUDU, Actual: LIN_BU_DU-LINBUDU
// console.log(foo.value); // 如果篡改了 getter，将直接返回 LIN_BU_DU
