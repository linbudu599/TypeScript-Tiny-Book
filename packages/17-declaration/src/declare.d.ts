declare var f1: () => void;

declare interface Foo {
  prop: string;
}

declare function foo(input: Foo): Foo;

declare class FooCls {}

declare let otherProp: Foo['prop'];

// Foo
declare let result: ReturnType<typeof foo>;

declare module 'pkg' {
  const handler: () => boolean;
}

declare module 'pkg2' {
  const handler: () => boolean;
  export default handler;
}

// declare.d.ts
declare module '*.md' {
  const raw: string;
  export default raw;
}

declare interface window {
  errorReporter: (err: any) => void;
}

declare const errorReporter: (err: any) => void;

interface Window {
  userTracker: (...args: any[]) => Promise<void>;
}

declare module 'fs' {
  export function bump(): void;
}
