export type Join1<
  List extends Array<string | number>,
  Delimiter extends string
> = List extends [string | number, ...infer Rest]
  ? // @ts-expect-error
    `${List[0]}${Delimiter}${Join1<Rest, Delimiter>}`
  : string;

// `lin-bu-du-${string}`
type JoinRes1 = Join1<['lin', 'bu', 'du'], '-'>;

export type JoinTmp<Delimiter> = [] extends [string | number, ...infer Rest]
  ? // @ts-expect-error
    `lin-bu-du-${Join1<Rest, Delimiter>}`
  : string;

export type Join2<
  List extends Array<string | number>,
  Delimiter extends string
> = List extends []
  ? ''
  : List extends [string | number, ...infer Rest]
  ? // @ts-expect-error
    `${List[0]}${Delimiter}${Join2<Rest, Delimiter>}`
  : string;

// `lin-bu-du-`
type JoinRes2 = Join2<['lin', 'bu', 'du'], '-'>;

export type Join<
  List extends Array<string | number>,
  Delimiter extends string
> = List extends []
  ? ''
  : List extends [string | number]
  ? `${List[0]}`
  : List extends [string | number, ...infer Rest]
  ? // @ts-expect-error
    `${List[0]}${Delimiter}${Join<Rest, Delimiter>}`
  : string;

// "lin-bu-du"
type JoinRes3 = Join<['lin', 'bu', 'du'], '-'>;
