import foo from 'pkg';
import raw from './note.md';

const res = foo.handler();

const content = raw.replace('NOTE', `NOTE${new Date().getDay()}`);
