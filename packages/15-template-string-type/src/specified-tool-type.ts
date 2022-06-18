type Heavy<T extends string> = `${Uppercase<T>}`;
type Respect<T extends string> = `${Capitalize<T>}`;

type HeavyName = Heavy<'linbudu'>; // "LINBUDU"
type RespectName = Respect<'linbudu'>; // "Linbudu"

type CopyWithRename<T extends object> = {
  [K in keyof T as `modified${Capitalize<string & K>}`]: T[K];
};

// {
//   modifiedName: string;
//   modifiedAge: number;
// }
type CopiedFoo = CopyWithRename<Foo>;

type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;

export {};
