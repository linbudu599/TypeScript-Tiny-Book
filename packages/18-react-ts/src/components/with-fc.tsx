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

const App = () => {
  return (
    <Container visible controller={() => {}}>
      <p>TypeScript + React!</p>
    </Container>
  );
};
