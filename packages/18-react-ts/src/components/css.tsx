/* eslint-disable */
import { CSSProperties } from 'react';

export interface IContainerProps {
  style: CSSProperties;
}

const css: CSSProperties = {
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
};

const Container = ({ style }: IContainerProps) => {
  return <p style={style}>林不渡！</p>;
};
