class Cat {
  eat(): boolean {
    return true;
  }
}

class Dog {
  eat(): number {
    return 599;
  }
}

function feedCat(cat: Cat) {}

// 报错！
feedCat(new Dog());

export {};
