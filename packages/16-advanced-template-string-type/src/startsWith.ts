type _StartsWith<
  Str extends string,
  Search extends string
> = Str extends `${Search}${infer _R}` ? true : false;

type StartsWith<Str extends string, Search extends string> = Str extends ''
  ? Search extends ''
    ? true
    : _StartsWith<Str, Search>
  : _StartsWith<Str, Search>;

type StartsWithRes1 = StartsWith<'linbudu', 'lin'>; // true
type StartsWithRes2 = StartsWith<'linbudu', ''>; // true
type StartsWithRes3 = StartsWith<'linbudu', ' '>; // false
type StartsWithRes4 = StartsWith<'', ''>; // true
type StartsWithRes5 = StartsWith<' ', ''>; // true
