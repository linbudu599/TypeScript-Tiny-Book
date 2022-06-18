import { expectType } from 'tsd';

interface VIP {
  vipExpires: number;
}

interface CommonUser {
  promotionUsed: boolean;
}

type User = VIP | CommonUser;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

type XORUser = XOR<VIP, CommonUser>;

expectType<XORUser>({
  vipExpires: 0,
});

expectType<XORUser>({
  promotionUsed: false,
});

// 报错，至少需要一个
// @ts-expect-error
expectType<XORUser>({});

// 报错，不允许同时拥有
// @ts-expect-error
expectType<XORUser>({
  promotionUsed: false,
  vipExpires: 0,
});

type XORStruct = XOR<
  {},
  {
    foo: string;
    bar: number;
  }
>;

// 没有 foo、bar
expectType<XORStruct>({});

// 同时拥有 foo、bar
expectType<XORStruct>({
  foo: 'linbudu',
  bar: 599,
});
