type TrimLeft<Str extends string> = Str extends ` ${infer R}`
  ? TrimLeft<R>
  : Str;

type TrimRight<Str extends string> = Str extends `${infer R} `
  ? TrimRight<R>
  : Str;

export type Trim<Str extends string> = TrimLeft<TrimRight<Str>>;
