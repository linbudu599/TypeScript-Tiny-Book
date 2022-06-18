import 'reflect-metadata';

type ClassStruct<T = any> = new (...args: any[]) => T;

class Container {
  private static services: Map<string, ClassStruct> = new Map();

  // Class:prop serviceKey
  public static propertyRegistry: Map<string, string> = new Map();

  public static set(key: string, value: ClassStruct): void {
    Container.services.set(key, value);
  }

  public static get<T = any>(key: string): T | undefined {
    const Cons = Container.services.get(key);
    if (!Cons) {
      return undefined;
    }

    // 说明此时是在取出已注册的类，需要返回实例
    const ins = new Cons();

    for (const info of Container.propertyRegistry) {
      const [injectKey, serviceKey] = info;

      const [classKey, propKey] = injectKey.split(':');

      if (classKey !== Cons.name) continue;

      const target = Container.get(serviceKey);

      if (target) {
        ins[propKey] = target;
      }
    }

    return ins;
  }

  private constructor() {}
}

function Provide(key: string): ClassDecorator {
  return (Target) => {
    Container.set(key, Target as unknown as ClassStruct);
  };
}

function Inject(key: string): PropertyDecorator {
  return (target, propertyKey) => {
    // Car:driver DriverService
    Container.propertyRegistry.set(
      `${target.constructor.name}:${String(propertyKey)}`,
      key
    );
  };
}

@Provide('DriverService')
class Driver {
  adapt(consumer: string) {
    console.log(`\n === 驱动已生效于 ${consumer}！===\n`);
  }
}

@Provide('Car')
class Car {
  @Inject('DriverService')
  driver!: Driver;

  run() {
    this.driver.adapt('Car');
  }
}

const car = Container.get<Car>('Car')!;

car.run();

export {};
