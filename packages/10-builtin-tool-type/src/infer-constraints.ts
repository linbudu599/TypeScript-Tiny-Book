type FirstArrayItemType<T extends any[]> = T extends [infer P, ...any[]]
  ? P extends string
    ? P
    : never
  : never;

type Tmp1 = FirstArrayItemType<[599, 'linbudu']>; // never
type Tmp2 = FirstArrayItemType<['linbudu', 599]>; // 'linbudu'
type Tmp3 = FirstArrayItemType<['linbudu']>; // 'linbudu'

type _FirstArrayItemType<T extends any[]> = T extends [infer P extends string, ...any[]]
  ? P
  : never;