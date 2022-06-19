import foo from 'pkg';
import bar from 'pkg2';
import raw from './note.md';
import { bump } from 'fs';

const res = foo.handler();

errorReporter('error');

window.userTracker;
bar();

const content = raw.replace('NOTE', `NOTE${new Date().getDay()}`);
