let a;
let b;

a = a + b;
a += b;

a = a - b;
a -= b;

a = a * b;
a *= b;

a ||= b;

if (!a) a = b;

// 或者
a = a ? a : b;

a = a ?? b;
a ??= b;

let arr: string[];

(arr ??= []).push('linbudu');
