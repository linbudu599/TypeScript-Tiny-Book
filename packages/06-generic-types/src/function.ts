function handle1(input: any): any {}

function handle2(input: string | number | {}): string | number | {} {}

function handle<T>(input: T): T {}

const author = 'linbudu'; // 使用 const 声明，被推导为 "linbudu"

let authorAge = 18; // 使用 let 声明，被推导为 number

handle(author); // 填充为字面量类型 "linbudu"
handle(authorAge); // 填充为基础类型 number

function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

const swapped1 = swap(['linbudu', 599]);
const swapped2 = swap([null, 599]);
const swapped3 = swap([{}]);

export {};
