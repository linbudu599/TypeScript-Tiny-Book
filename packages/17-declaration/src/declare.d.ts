declare module 'pkg' {
  export const handler: () => boolean;
}

// declare.d.ts
declare module '*.md' {
  const raw: string;
  export default raw;
}

declare interface window {
  errorReporter: (err: any) => void;
}
