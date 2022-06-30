import 'reflect-metadata';

type ClassStruct<T = any> = new (...args: any[]) => T;

type ServiceKey<T = any> = string | ClassStruct<T> | Function;

class Container {
  private static services: Map<ServiceKey, ClassStruct> = new Map();

  // Class:prop serviceKey
  public static propertyRegistry: Map<string, string> = new Map();

  public static set(key: ServiceKey, value: ClassStruct): void {
    Container.services.set(key, value);
  }

  public static get<T = any>(key: ServiceKey): T | undefined {
    // 检查是否注册
    const Cons = Container.services.get(key);

    if (!Cons) {
      return undefined;
    }

    // 实例化这个类
    const ins = new Cons();

    // 遍历注册信息
    for (const info of Container.propertyRegistry) {
      // 注入标识符与要注入类的标识符
      const [injectKey, serviceKey] = info;
      // 拆分为 Class 名与属性名
      const [classKey, propKey] = injectKey.split(':');

      // 如果不是这个类，就跳过
      if (classKey !== Cons.name) continue;

      // 取出需要注入的类，这里拿到的是已经实例化的
      const target = Container.get(serviceKey);

      if (target) {
        // 赋值给对应的属性
        ins[propKey] = target;
      }
    }

    return ins;
  }
  private constructor() {}
}

function Provide(key?: string): ClassDecorator {
  return (Target) => {
    Container.set(key ?? Target.name, Target as unknown as ClassStruct);
    Container.set(Target, Target as unknown as ClassStruct);
  };
}

function Inject(key?: string): PropertyDecorator {
  return (target, propertyKey) => {
    // Car:driver DriverService
    // 需要为 Car 类的实例的 driver 属性注入 DriverService 的实例
    Container.propertyRegistry.set(
      `${target.constructor.name}:${String(propertyKey)}`,
      // Driver
      key ?? Reflect.getMetadata('design:type', target, propertyKey)
    );
  };
}

@Provide('DriverService')
class Driver {
  adapt(consumer: string) {
    console.log(`\n === 驱动已生效于 ${consumer}！===\n`);
  }
}

@Provide()
class Fuel {
  fill(consumer: string) {
    console.log(`\n === 燃料已填充完毕 ${consumer}！===`);
  }
}

@Provide()
class Car {
  @Inject()
  driver!: Driver;

  @Inject()
  fule!: Fuel;

  run() {
    this.fule.fill('Car');
    this.driver.adapt('Car');
  }
}

@Provide()
class Bus {
  @Inject('DriverService')
  driver!: Driver;

  @Inject('Fuel')
  fule!: Fuel;

  run() {
    this.fule.fill('Bus');
    this.driver.adapt('Bus');
  }
}

const car = Container.get(Car)!;
const bus = Container.get(Bus)!;

car.run();
bus.run();

export {};
