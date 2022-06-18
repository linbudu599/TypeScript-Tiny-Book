export type Replace<
  Input extends string,
  Search extends string,
  Replacement extends string,
  ShouldReplaceAll extends boolean = false
> = Input extends `${infer Head}${Search}${infer Tail}`
  ? ShouldReplaceAll extends true
    ? Replace<
        `${Head}${Replacement}${Tail}`,
        Search,
        Replacement,
        ShouldReplaceAll
      >
    : `${Head}${Replacement}${Tail}`
  : Input;
