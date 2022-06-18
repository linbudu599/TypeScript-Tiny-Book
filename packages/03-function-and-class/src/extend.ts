class Base {
  print() {}
}

class Derived extends Base {
  print() {
    super.print();
    // ...
  }
}

class Base1 {
  printWithLove() {}
}

class Derived1 extends Base1 {
  override print() {
    // ...
  }
}
