// 并集
export type Concurrence<A, B> = A | B;

// 交集
export type Intersection<A, B> = A extends B ? A : never;

// 差集
export type Difference<A, B> = A extends B ? never : A;

// 补集
export type Complement<A, B extends A> = Difference<A, B>;

// 使用更精确的对象类型描述结构
export type PlainObjectType = Record<string, any>;

// 属性名并集
export type ObjectKeysConcurrence<
  T extends PlainObjectType,
  U extends PlainObjectType
> = keyof T | keyof U;

// 属性名交集
export type ObjectKeysIntersection<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Intersection<keyof T, keyof U> & Intersection<keyof U, keyof T>;

// 属性名差集
export type ObjectKeysDifference<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Difference<keyof T, keyof U>;

// 属性名补集
export type ObjectKeysComplement<
  T extends U,
  U extends Partial<PlainObjectType>
> = Complement<keyof T, keyof U>;

export type ObjectIntersection<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Pick<T, ObjectKeysIntersection<T, U>>;

export type ObjectDifference<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Pick<T, ObjectKeysDifference<T, U>>;

export type ObjectComplement<T extends U, U extends PlainObjectType> = Pick<
  T,
  ObjectKeysComplement<T, U>
>;

type Merge<
  T extends PlainObjectType,
  U extends PlainObjectType
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 U 优先级更高，再加上 U 比 T 多的部分即可
> = ObjectDifference<T, U> & ObjectIntersection<U, T> & ObjectDifference<U, T>;

type Assign<
  T extends PlainObjectType,
  U extends PlainObjectType
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 T 优先级更高，再加上 U 比 T 多的部分即可
> = ObjectDifference<T, U> & ObjectIntersection<T, U> & ObjectDifference<U, T>;

type Override<
  T extends PlainObjectType,
  U extends PlainObjectType
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 U 优先级更高（逆并集）)
> = ObjectDifference<T, U> & ObjectIntersection<U, T>;
