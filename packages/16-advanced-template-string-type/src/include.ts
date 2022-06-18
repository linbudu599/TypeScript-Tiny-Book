type Include<
  Str extends string,
  Search extends string
> = Str extends `${infer _R1}${Search}${infer _R2}` ? true : false;

type IncludeRes1 = Include<'linbudu', 'lin'>; // true
type IncludeRes2 = Include<'linbudu', '_lin'>; // false
type IncludeRes3 = Include<'linbudu', ''>; // true
type IncludeRes4 = Include<' ', ''>; // true
type IncludeRes5 = Include<'', ''>; // false
