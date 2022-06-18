type WordDelimiter = '-' | '_' | ' ';

type DelimiterCase2CamelCaseAuto<S extends string> =
  S extends `${infer Head}${infer Delimiter}${infer Rest}`
    ? Delimiter extends WordDelimiter
      ? `${Head}${DelimiterCase2CamelCaseAuto<Capitalize<Rest>>}`
      : S
    : S;
