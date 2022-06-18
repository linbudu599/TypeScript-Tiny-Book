const str = 'linbudu';

const obj = { name: 'linbudu' };

const nullVar = null;
const undefinedVar = undefined;

const func = (input: string) => {
  return input.length > 10;
};

type Str = typeof str; // "linbudu"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean

const func2: typeof func = (name: string) => {
  return name === 'linbudu';
};

type FuncReturnType = ReturnType<typeof func>;


const isInputValid = (input: string) => {
  return input.length > 10;
}

// 不允许
let isValid: typeof isInputValid("linbudu");