export interface IStruct {
  name: string;
  age: number;
  sex: string;
  favors: (string | number)[];
  IJob: IJob;
}

export interface IJob {
  name: string;
  stack: string;
  company: string;
}
