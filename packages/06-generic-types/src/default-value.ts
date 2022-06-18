type Factory<T = boolean> = T | number | string;

const foo: Factory = false;

function add(source: number, add: number) {
  if (typeof source !== 'number' || typeof add !== 'number') {
    throw new Error('Invalid arguments!');
  }

  return source + add;
}

type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure';

// "success"
type Res1 = ResStatus<10000>;
// "failure"
type Res2 = ResStatus<20000>;
// 类型“string”不满足约束“number”。
type Res3 = ResStatus<'10000'>;

type _ResStatus<ResCode extends number = 10000> = ResCode extends
  | 10000
  | 10001
  | 10002
  ? 'success'
  : 'failure';

// "success"
type Res4 = _ResStatus;

export {};
