interface IObjectStruct {
  name: string;
  age: number;
  male: boolean;
}

type PossibleSource = 'juejin' | 'zhihu' | 'segmentfault';

type Handler = () => Promise<void>;
