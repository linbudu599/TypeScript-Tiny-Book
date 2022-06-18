/* eslint-disable */
import { ChangeEventHandler, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';

const Container = () => {
  const [v, setV] = useState('linbudu');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {};

  const handleChange2: ChangeEventHandler<HTMLInputElement> = (e) => {};

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <input value={v} onChange={handleChange} />
      <button onClick={handleClick}>Click me!</button>
    </>
  );
};
