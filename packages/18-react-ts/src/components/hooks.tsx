/* eslint-disable */
import {
  useState,
  useCallback,
  useMemo,
  useContext,
  useReducer,
  useRef,
  useImperativeHandle,
} from 'react';

const Container = () => {
  // 推导为 string 类型
  const [state1, setState1] = useState('linbudu');
  // 此时类型为 string | undefined
  const [state2, setState2] = useState<string>();

  // 泛型推导为 (input: number) => boolean
  const handler1 = useCallback((input: number) => {
    return input > 599;
  }, []);

  // 显式提供为 (input: number, compare: boolean) => boolean
  const handler2 = useCallback<(input: number, compare: boolean) => boolean>(
    (input: number) => {
      return input > 599;
    },
    []
  );

  // 推导为 string
  const result1 = useMemo(() => {
    return 'some-expensive-process';
  }, []);

  // 显式提供
  const result2 = useMemo<{ name?: string }>(() => {
    return {};
  }, []);

  const domRef = useRef<HTMLIFrameElement>(null);

  const valueRef = useRef<number>(599);

  const operateRef = () => {
    domRef.current?.getBoundingClientRect();
    valueRef.current += 1;
  };

  return (
    <div ref={domRef}>
      <p>林不渡</p>
    </div>
  );
};
