window.onerror = (event, source, line, col, err) => {};

interface Handler {
  // 简化
  onerror: OnErrorEventHandlerNonNull;
}

interface OnErrorEventHandlerNonNull {
  (
    event: Event | string,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ): any;
}

type CustomHandler = (name: string, age: number) => boolean;

const handler: CustomHandler = (arg1, arg2) => true;

declare const struct: {
  handler: CustomHandler;
};

struct.handler = (name, age) => {};

// 正常
window.onerror = (event) => {};
// 报错
window.onerror = (event, source, line, col, err, extra) => {};
