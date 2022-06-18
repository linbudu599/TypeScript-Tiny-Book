type AsyncFunc = (...args: any[]) => Promise<any>;

type OnlyAsyncMethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<AsyncFunc>
) => void;

function OnlyAsyncFunc(): OnlyAsyncMethodDecorator {
  return (target, propKey, descriptor) => {};
}

class Foo {
  @OnlyAsyncFunc()
  handler() {}

  @OnlyAsyncFunc()
  async asyncHandler() {}
}

export {};
