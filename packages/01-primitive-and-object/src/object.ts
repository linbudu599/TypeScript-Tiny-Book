interface IDescription {
  name: string;
  age: number;
  male: boolean;
}

const obj1: IDescription = {
  name: 'linbudu',
  age: 599,
  male: true,
};

interface IDescription2 {
  name: string;
  age: number;
  male?: boolean;
  func?: Function;
}

const obj2: IDescription2 = {
  name: 'linbudu',
  age: 599,
  male: true,
  // 无需实现 func 也是合法的
};

obj2.male = false;
obj2.func = () => {};

interface IDescription3 {
  readonly name: string;
  age: number;
}

const obj3: IDescription3 = {
  name: 'linbudu',
  age: 599,
};

// 无法分配到 "name" ，因为它是只读属性
obj3.name = '林不渡';
