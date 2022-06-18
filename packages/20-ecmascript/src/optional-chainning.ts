const obj: any = {};

const inner = obj && obj.data && obj.data.innerProperty;

const inner1 = obj?.data?.innerProperty;

obj?.[expr];
obj?.[++a];
// 对应到 obj.func && obj.func()
obj?.func();
