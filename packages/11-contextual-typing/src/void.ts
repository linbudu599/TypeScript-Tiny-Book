type CustomHandler = (name: string, age: number) => void;

const handler1: CustomHandler = (name, age) => true;
const handler2: CustomHandler = (name, age) => 'linbudu';
const handler3: CustomHandler = (name, age) => null;
const handler4: CustomHandler = (name, age) => undefined;

const result1 = handler1('linbudu', 599); // void
const result2 = handler2('linbudu', 599); // void
const result3 = handler3('linbudu', 599); // void
const result4 = handler4('linbudu', 599); // void

const arr: number[] = [];
const list: number[] = [1, 2, 3];

list.forEach((item) => arr.push(item));
list.forEach(() => arr.push());

export {};
