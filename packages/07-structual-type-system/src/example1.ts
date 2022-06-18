class Cat {
  eat() {}
}

class Dog {
  eat() {}
}

function feedCat(cat: Cat) {}

feedCat(new Dog());
