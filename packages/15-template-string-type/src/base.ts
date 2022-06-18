type World = 'World';

// "Hello World"
type Greeting = `Hello ${World}`;

type Greet<T extends string | number | boolean | null | undefined | bigint> =
  `Hello ${T}`;

type Greet1 = Greet<'linbudu'>; // "Hello linbudu"
type Greet2 = Greet<599>; // "Hello 599"
type Greet3 = Greet<true>; // "Hello true"
type Greet4 = Greet<null>; // "Hello null"
type Greet5 = Greet<undefined>; // "Hello undefined"
type Greet6 = Greet<0x1fffffffffffff>; // "Hello 9007199254740991"

type Version = `${number}.${number}.${number}`;

type Brand = 'iphone' | 'xiaomi' | 'honor';
type Memory = '16G' | '64G';
type ItemType = 'official' | 'second-hand';

type SKU = `${Brand}-${Memory}-${ItemType}`;

type SizeRecord<Size extends string> = `${Size}-Record`;

type Size = 'Small' | 'Middle' | 'Large';

// "Small-Record" | "Middle-Record" | "Huge-Record"
type UnionSizeRecord = SizeRecord<Size>;
