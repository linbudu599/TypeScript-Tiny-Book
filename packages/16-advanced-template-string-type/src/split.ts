export type _Split<Str extends string> =
  Str extends `${infer Head}-${infer Body}-${infer Tail}`
    ? [Head, Body, Tail]
    : [];

type _SplitRes1 = _Split<'lin-bu-du'>; // ["lin", "bu", "du"]

export type Split<
  Str extends string,
  Delimiter extends string
> = Str extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : Str extends Delimiter
  ? []
  : [Str];

// ["linbudu", "599", "fe"]
type SplitRes1 = Split<'linbudu,599,fe', ','>;

// ["linbudu", "599", "fe"]
type SplitRes2 = Split<'linbudu 599 fe', ' '>;

// ["l", "i", "n", "b", "u", "d", "u"]
type SplitRes3 = Split<'linbudu', ''>;

type Delimiters = '-' | '_' | ' ';

// ["lin", "bu", "du"]
type SplitRes4 = Split<'lin_bu_du', Delimiters>;

// ["lin" | "lin_bu", "du"] | ["lin" | "lin_bu", "bu", "du"]
type SplitRes5 = Split<'lin_bu-du', Delimiters>;
