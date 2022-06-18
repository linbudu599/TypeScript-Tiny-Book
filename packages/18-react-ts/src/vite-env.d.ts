import type * as ViteClientEnv from 'vite/client';

declare interface window {
  errorReporter: (err: any) => void;
}

declare function errorReporter(err: any): void;
