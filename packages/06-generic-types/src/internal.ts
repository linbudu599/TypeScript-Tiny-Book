function p() {
  return new Promise<boolean>((resolve, reject) => {
    resolve(true);
  });
}

interface PromiseConstructor {
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

declare var Promise: PromiseConstructor;

const arr: Array<number> = [1, 2, 3];

// 类型“string”的参数不能赋给类型“number”的参数。
arr.push('linbudu');
// 类型“string”的参数不能赋给类型“number”的参数。
arr.includes('linbudu');

// number | undefined
arr.find(() => false);

arr.reduce((prev, curr, idx, arr) => {
  return prev;
}, 1);

arr.reduce((prev, curr, idx, arr) => {
  return prev;
}, []);

arr.reduce<number[]>((prev, curr, idx, arr) => {
  return prev;
}, []);
