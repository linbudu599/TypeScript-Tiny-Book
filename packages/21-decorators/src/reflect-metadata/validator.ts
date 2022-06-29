import 'reflect-metadata';

enum TypeValidation {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
}

const validationMetadataKey = Symbol('expectedType');
const requiredMetadataKey = Symbol('requiredKeys');

function Required(): PropertyDecorator {
  return (target, prop) => {
    const existRequiredKeys: string[] =
      Reflect.getMetadata(requiredMetadataKey, target) ?? [];

    Reflect.defineMetadata(
      requiredMetadataKey,
      [...existRequiredKeys, prop],
      target
    );
  };
}

function ValueType(type: TypeValidation): PropertyDecorator {
  return (target, prop) => {
    Reflect.defineMetadata(validationMetadataKey, type, target, prop);
  };
}

class User {
  @Required()
  name!: string;

  @ValueType(TypeValidation.Number)
  age!: number;
}

const user = new User();

// @ts-expect-error
user.age = '18';

function validator(entity: any) {
  const clsName = entity.constructor.name;
  const messages: string[] = [];
  // 先检查所有必填属性
  const requiredKeys: string[] = Reflect.getMetadata(
    requiredMetadataKey,
    entity
  );

  // 基于反射拿到所有存在的属性
  const existKeys = Reflect.ownKeys(entity);

  for (const key of requiredKeys) {
    if (!existKeys.includes(key)) {
      messages.push(`${clsName}.${key} should be required.`);
      // throw new Error(`${key} is required!`);
    }
  }

  // 接着基于定义在属性上的元数据校验属性类型
  for (const key of existKeys) {
    const expectedType: string = Reflect.getMetadata(
      validationMetadataKey,
      entity,
      key
    );

    if (!expectedType) continue;

    // 枚举也是对象，因此 Object.values 同样可以生效（只不过也会包括键名）
    // @ts-expect-error
    if (Object.values(TypeValidation).includes(expectedType)) {
      const actualType = typeof entity[key];
      if (actualType !== expectedType) {
        messages.push(
          `expect ${entity.constructor.name}.${String(
            key
          )} to be ${expectedType}, but got ${actualType}.`
        );
        // throw new Error(`${String(key)} is not ${expectedType}!`);
      }
    }
  }
  return messages;
}

console.log(validator(user));
