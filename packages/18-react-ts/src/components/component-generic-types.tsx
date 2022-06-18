import { PropsWithChildren } from 'react';

/* eslint-disable */
interface ICellProps<TData> {
  prop: keyof TData;
}

const Cell = <T extends Record<string, any>>(
  props: PropsWithChildren<ICellProps<T>>
) => {
  return <p></p>;
};

interface IDataStruct {
  name: string;
  age: number;
}

const App = () => {
  return (
    <>
      <Cell<IDataStruct> prop="name"></Cell>
      <Cell<IDataStruct> prop="age"></Cell>
    </>
  );
};
