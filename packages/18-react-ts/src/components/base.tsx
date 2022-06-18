export interface IContainerProps {
  visible: boolean;
  controller: () => void;
}

export const Container = ({
  visible = false,
  controller = () => {},
}: IContainerProps): JSX.Element => {
  return <p>林不渡！</p>;
};
