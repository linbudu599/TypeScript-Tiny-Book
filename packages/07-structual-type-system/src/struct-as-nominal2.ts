class CNY {
  private __tag!: void;
  constructor(public value: number) {}
}
class USD {
  private __tag!: void;
  constructor(public value: number) {}
}

const CNYCount = new CNY(100);
const USDCount = new USD(100);

function addCNY(source: CNY, input: CNY) {
  return source.value + input.value;
}

addCNY(CNYCount, CNYCount);
// 报错了！
addCNY(CNYCount, USDCount);

export {};
