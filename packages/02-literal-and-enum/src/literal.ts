interface Res {
  code: 10000 | 10001 | 50000;
  status: 'success' | 'failure';
  data: any;
}

const str: 'linbudu' = 'linbudu';
const num: 599 = 599;
const bool: true = true;

// 报错！
const str1: 'linbudu' = 'linbudu599';
const str2: string = 'linbudu';
const str3: string = 'linbudu599';

interface Tmp {
  bool: true | false;
  num: 1 | 2 | 3;
  str: 'lin' | 'bu' | 'du';
}

interface Tmp {
  mixed: true | string | 599 | {} | (() => {}) | (1 | 2);
}

interface Tmp {
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

declare var tmp: Tmp;

if (tmp.user.vip) {
  console.log(tmp.user.expires);
}

type Code = 10000 | 10001 | 50000;

type Status = 'success' | 'failure';

interface _Tmp {
  obj: {
    name: 'linbudu';
    age: 18;
  };
}

const _tmp: _Tmp = {
  obj: {
    name: 'linbudu',
    age: 18,
  },
};

export {};
