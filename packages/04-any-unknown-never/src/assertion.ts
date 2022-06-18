const str: string = 'linbudu';

(str as any).func().foo().prop;

function foo(union: string | number) {
  if ((union as string).includes('linbudu')) {
  }

  if ((union as number).toFixed() === '599') {
  }
}

interface IFoo {
  name: string;
}

declare const obj: {
  foo: IFoo;
};

const { foo = {} as IFoo } = obj;

export {};
