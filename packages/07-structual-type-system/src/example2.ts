class Cat {
  eat() {}
}

class Dog {
  bark() {}
  eat() {}
}

function feedCat(cat: Cat) {}

feedCat(new Dog());

export {};
