let unknownVar: unknown = 'linbudu';

unknownVar = false;
unknownVar = 'linbudu';
unknownVar = {
  site: 'juejin',
};

unknownVar = () => {};

const val1: string = unknownVar; // Error
const val2: number = unknownVar; // Error
const val3: () => {} = unknownVar; // Error
const val4: {} = unknownVar; // Error

const val5: any = unknownVar;
const val6: unknown = unknownVar;

unknownVar.foo(); // 报错：对象类型为 unknown
(unknownVar as { foo: () => {} }).foo();
