type Fibonacci<
  T extends number,
  // 记录数列的索引，就是计算到第几个值了
  CurrentIndex extends any[] = [1],
  // 数列倒数第二个值
  Prev extends any[] = [],
  // 数列最后面一个值
  Current extends any[] = [1]
> =
  // 当数列计算的索引与 T 一致时，就可以返回数列最后一个值的长度了
  CurrentIndex['length'] extends T
    ? Current['length']
    : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>;

// 1 1 2 3 5 8 13 21
type A = Fibonacci<6>;
