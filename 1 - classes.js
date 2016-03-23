"use strict";

class Person
{
  get Name() { return this.name };
  get Age() { return this.age };

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

var bob = new Person("Bob", 30);

console.assert(bob.Name == "Bob");
console.assert(bob.Age == 30);
