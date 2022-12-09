class Foo {
  @ComputeProfiler()
  async fetch() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('RES');
      }, 3000);
    });
  }
}

function ComputeProfiler(): MethodDecorator {
  return (
    _target,
    methodIdentifier,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    const start = new Date();
    const originalMethodImpl = descriptor.value!;
    descriptor.value = async function (...args: unknown[]) {
      const res = await originalMethodImpl.apply(this, args);
      const end = new Date();
      console.log(
        `${String(methodIdentifier)} Time: `,
        end.getTime() - start.getTime()
      );
      return res;
    };
  };
}

(async () => {
  console.log(await new Foo().fetch());
})();

export {};
