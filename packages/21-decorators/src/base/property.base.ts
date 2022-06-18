class Foo {
  @ModifyNickName()
  nickName!: string;
  constructor() {}
}

function ModifyNickName(): PropertyDecorator {
  return (target: any, propertyIdentifier) => {
    target[propertyIdentifier] = '林不渡!';
    target['otherName'] = '别名林不渡!';
  };
}

console.log(new Foo().nickName);
// @ts-expect-error
console.log(new Foo().otherName);

export {};
