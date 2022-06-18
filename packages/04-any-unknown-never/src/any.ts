let anyVar: any = 'linbudu';

anyVar = false;
anyVar = 'linbudu';
anyVar = {
  site: 'juejin',
};

anyVar = () => {};

const val1: string = anyVar;
const val2: number = anyVar;
const val3: () => {} = anyVar;
const val4: {} = anyVar;

anyVar.foo.bar.baz();
anyVar[0][1][2].prop1;
