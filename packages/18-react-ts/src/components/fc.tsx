/* eslint-disable */
import React from 'react';

export interface IContainerProps {
  visible: boolean;
  controller: () => void;
}

const Container: React.FC<IContainerProps> = ({
  visible = false,
  controller = () => {},
}: IContainerProps) => {
  return <p>林不渡！</p>;
};
