type SymbolPropertyDecorator = (target: Object, propertyKey: symbol) => void;

type LiteralPropertyDecorator = (
  target: Object,
  propertyKey: 'linbudu'
) => void;

function OnlySymbolProperty(): SymbolPropertyDecorator {
  return (target, propertyKey) => {};
}

function OnlyLiteralProperty(): LiteralPropertyDecorator {
  return (target, propertyKey) => {};
}

type PickByValueType<T, Value> = {
  [Key in keyof T]: T[Key] extends Value ? Key : never;
}[keyof T];

type StringTypePropertyDecorator = <T extends object>(
  target: T,
  propertyKey: PickByValueType<T, string>
) => void;

function OnlyStringTypeProperty(): StringTypePropertyDecorator {
  return (target, propertyKey) => {};
}

const sym = Symbol('linbudu');

class Foo {
  @OnlySymbolProperty()
  [sym]!: string;

  @OnlySymbolProperty()
  @OnlyStringTypeProperty()
  str!: string;

  @OnlyStringTypeProperty()
  bool: boolean = true;

  @OnlyLiteralProperty()
  linbudu!: 'linbudu';
}

export {};
