# 装饰器 Sync

- https://github.com/rbuckton/reflect-metadata

- https://rbuckton.github.io/reflect-metadata/

- https://www.typescriptlang.org/docs/handbook/decorators.html

- https://juejin.cn/post/6859314697204662279#heading-8

- 执行顺序

  - 从下到上调用实际结果
  - 通俗的说，反射就是根据给出的类名（字符串）来生成对象。这种编程方式可以让应用在运行时才动态决定生成哪一种对象。反射的应用是很广泛的，像Hibernate、Spring中都是用“反射”做为最基本的技术手段。

- 装饰器执行时实例属性还没被添加完

- Class

  - 覆盖内部属性、方法实现
  - 通过重新赋值或者返回一个子类
  - 可以通过 Seal 方法组织

- Method

  - 覆盖方法实现（因为能拿到描述符）
  
  - 耗时计算、调用统计
  
- Property

  - 没有属性描述符

  - 实例属性未初始化

  - 仅能观察或定义元数据

  - 只能覆盖没有初始值或者不会被初始化的属性

- Accessor

  - Get 和 Set 只能有一种

  - 只能放在先定义的 accessor 上

  - 因为这里本质上是方法装饰器，相当于 getter setter 同时能干

  - 不允许使用 描述符 value，而是 get 与 set enumerable configurable

  - 使用了 getter 装饰器再 set，会暴栈，因为无限循环调用 setter 了
    - 也不应该再 originalGetter ，而是直接返回一个新的值

  - setter 中拿不到原型 因此其实不能直接复制
    - originalSetter 的话会暴栈

    - 可以重定义 getter

- Paramaters

  - 只能用来检查这个参数是否被声明，因为无法修改值
  - 可以注入元数据然后由类装饰器来修改

  

  

- Reflect

  - 反射与元数据的关系
  
    - ES6 的 reflect
      - **通过 Proxy 创建对于原始对象的代理对象，从而在代理对象中使用 Reflect 达到对于 JavaScript 原始操作的拦截。**
      - 反射机制指的是程序在运行时能够获取自身的信息
      - 简化调用
  
  - 原本就有 get，set 等方法
  
  - 注解等
  
  - 这个包的命名：基于反射添加元数据
  
  - 添加的主要是元数据相关的，这次方法添加了才能访问到
  
  - 声明文件中在全局注册了命名空间
  
  - @types 和项目自己的声明文件的表现需要说明一下
  
    - 用于全局 vs 仅导入时生效
  
  - 在类声明 C 上定义的元数据存储在 C.[[Metadata]] 中，以 undefined 为键。
  
    在类声明 C 的静态成员上定义的元数据存储在 C.[[Metadata]] 中，以属性键为键。
  
    在类声明 C 的实例成员上定义的元数据存储在 C.prototype.[[Metadata]] 中，以属性键为键。
  
  
  
- 
  
- > 注意，属性装饰器和方法装饰器的 `target` 参数与类装饰器的不同，后者的 `target` 是类本身，而前者的 `target` 是这个类的 `prototype`。所以，我们在这里只需要将 `target` 参数的类型指定为 `SomeClass` 即可，而非 `Type<SomeClass>`。
  >  如果用 `targetA` 来表示类装饰器的 `target` 参数，用 `targetB` 来表示属性装饰器和类装饰器的 `target` 参数，则 `targetA.prototype == targetB && targetA == targetB.constructor` 将返回 `true`。
  >  

  

  - 上下文类型！
