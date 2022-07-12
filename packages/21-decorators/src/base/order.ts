function Deco(identifier: string): any {
  console.log(`${identifier} 执行`);
  return function () {
    console.log(`${identifier} 应用`);
  };
}

@Deco('类装饰器')
class Foo {
  constructor(@Deco('构造函数参数装饰器') name: string) {}

  @Deco('实例方法装饰器')
  handler(@Deco('实例方法参数装饰器') args: any) {}

  @Deco('实例属性装饰器')
  prop?: number;
}

export {};
