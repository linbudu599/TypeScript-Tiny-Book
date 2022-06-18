/* eslint-disable */
import {
  useRef,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react';

interface IRefPayload {
  controller: () => void;
}

const Parent = () => {
  const childRef = useRef<IRefPayload>(null);

  const invokeController = () => {
    childRef.current?.controller();
  };

  return (
    <>
      <Child ref={childRef} />
      <button onClick={invokeController}>invoke controller!</button>
    </>
  );
};

interface IChildPropStruct {}

interface IExtendedRefPayload extends IRefPayload {
  disposer: () => void;
}

const Child = forwardRef<IRefPayload, IChildPropStruct>((props, ref) => {
  const internalController = () => {
    console.log('Internal Controller!');
  };

  useImperativeHandle<IRefPayload, IExtendedRefPayload>(
    ref,
    () => {
      return {
        controller: internalController,
        disposer: () => {},
      };
    },
    []
  );

  return <p></p>;
});
