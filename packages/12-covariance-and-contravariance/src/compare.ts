function fn(dog: Dog) {
  dog.bark();
}

type CorgiFunc = (input: Corgi) => void;
type AnimalFunc = (input: Animal) => void;

const func1: CorgiFunc = fn;
const func2: AnimalFunc = fn;

export {};
