export type Replace<
  Str extends string,
  Search extends string,
  Replacement extends string
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? `${Head}${Replacement}${Tail}`
  : Str;

// "林不渡也不是不能渡"
type ReplaceRes1 = Replace<'林不渡', '不', '不渡也不是不能'>;
// "林不渡"
type ReplaceRes2 = Replace<'林不渡', '？', '？？'>; //

export type ReplaceAll<
  Str extends string,
  Search extends string,
  Replacement extends string
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? ReplaceAll<`${Head}${Replacement}${Tail}`, Search, Replacement>
  : Str;

// "mmm.linbudu.top"
type ReplaceAllRes1 = ReplaceAll<'www.linbudu.top', 'w', 'm'>;
// "www-linbudu-top"
type ReplaceAllRes2 = ReplaceAll<'www.linbudu.top', '.', '-'>;
