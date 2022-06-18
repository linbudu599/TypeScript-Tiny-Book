import { Split } from './split';
import { Trim } from './trim';

export type StrLength<T extends string> = Split<Trim<T>, ''>['length'];

type StrLengthRes1 = StrLength<'linbudu'>; // 7
type StrLengthRes2 = StrLength<'lin budu'>; // 8
type StrLengthRes3 = StrLength<''>; // 0
type StrLengthRes4 = StrLength<' '>; //
