abstract class AbsFoo {
  abstract absProp: string;
  abstract get absGetter(): string;
  abstract absMethod(name: string): string;
}

class Foo implements AbsFoo {
  absProp: string = 'linbudu';

  get absGetter() {
    return 'linbudu';
  }

  absMethod(name: string) {
    return name;
  }
}

interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(input: string): string;
}

class Foo1 implements FooStruct {
  absProp: string = 'linbudu';

  get absGetter() {
    return 'linbudu';
  }

  absMethod(name: string) {
    return name;
  }
}

export {};
