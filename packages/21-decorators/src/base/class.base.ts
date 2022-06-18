@AddProperty('linbudu')
@AddMethod()
class Foo {
  a = 1;
}

function AddMethod(): ClassDecorator {
  return (target: any) => {
    target.prototype.newInstanceMethod = () => {
      console.log("Let's add a new instance method!");
    };
    target.newStaticMethod = () => {
      console.log("Let's add a new static method!");
    };
  };
}

function AddProperty(value: string): ClassDecorator {
  return (target: any) => {
    target.prototype.newInstanceProperty = value;
    target.newStaticProperty = `static ${value}`;
  };
}

const foo: any = new Foo();

foo.newInstanceMethod();
(<any>Foo).newStaticMethod();

console.log(foo.newInstanceProperty);
console.log((<any>Foo).newStaticProperty);

function Seal(): ClassDecorator {
  return (target: any) => {
    Object.seal(target);
    Object.seal(target.prototype);
  };
}

type ClassStruct = new (...args: any[]) => any;

const OverrideBar = <T extends { new (...args: any[]): any }>(target: T) => {
  return class extends target {
    print() {}
    overridedPrint() {
      console.log('This is Overrided Bar!');
    }
  };
};

@OverrideBar
class Bar {
  print() {
    console.log('This is Bar!');
  }
}

// void
new Bar().print();

(<any>new Bar()).overridedPrint();
