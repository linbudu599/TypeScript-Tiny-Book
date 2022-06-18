/* eslint-disable */
import {
  ComponentProps,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  Component,
  FC,
} from 'react';

interface IButtonProps extends ComponentProps<'button'> {
  size?: 'small' | 'large';
  link?: boolean;
}
const Button = (props: IButtonProps) => {
  return <button {...props}>{props.children}</button>;
};
