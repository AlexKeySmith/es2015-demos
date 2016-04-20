"use strict";

require("chai").should();

describe("classes", function() {

  let sound = "dog";

  class Person { //clases are not hoisted, need declaring before using.
    //let eyeColor //you can't declare variables and no need for ,


    get Name() { return this.name };
    set FavouriteColour(value) { this.favouriteColour = value; }
    get FavouriteColour() { return this.favouriteColour; }
    get [sound]() { return "woof"; }

    constructor(name, age) {
      this.name = name; //just uses this to set a dyanmic property.
      this.age = age;
    };
  }

  let person;

  beforeEach(function() {
    person = new Person("Alex", 31);
  })

  it("can use a constructor without backing fields (just using this to create dynamic fields)", function() {
    person.Name.should.equal("Alex");
  });

  it("leaks fields", function() {
    person.age.should.equal(31);
  });

  it("has setters", function() {
    person.FavouriteColour = "Green";
    person.FavouriteColour.should.equal("Green");
  });

  it("has dynamic properties during definition and access!", function() {
    var propertyName = "dog"
    person[propertyName].should.equal("woof");
  });

  it("can be extended", function() {

    class Hero extends Person {

    }

  })

});
