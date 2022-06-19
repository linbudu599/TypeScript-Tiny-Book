import { util } from '../utils';
import { core } from '../core';
import { ui } from '../ui';

export const app = () => {
  ui();
  core();
  util();
  console.log('app!');
};
