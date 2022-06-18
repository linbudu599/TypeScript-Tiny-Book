class Foo {
  handler(@CheckParam() input: string) {
    console.log(input);
  }
}

function CheckParam(): ParameterDecorator {
  return (target, paramIdentifier, index) => {
    console.log(target, paramIdentifier, index);
  };
}

new Foo().handler('linbudu');

export {};
