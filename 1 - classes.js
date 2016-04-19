"use strict";

require("chai").should();

describe("classes", function() {
  
  class Person
  {
    get Name() { return this.name };
    set FavouriteColour(value) { this.favouriteColour = value; }
    get FavouriteColour() { return this.favouriteColour; }

    constructor(name, age) {
      this.name = name; //just uses this to set a dyanmic property.
      this.age = age;
    };
  }

  let person;

  beforeEach(function() {
    person = new Person("Alex", 31);
  })

  it("can use a constructor without backing fields", function() {
    person.Name.should.equal("Alex");
  });

  it("leaks fields", function() {
    person.age.should.equal(31);
  });

  it("has setters", function() {
    person.FavouriteColour = "Green";
    person.FavouriteColour.should.equal("Green");
  });

  it("has dynamic properties", function() {
    var propertyName = "na" + "me";
    person[propertyName].should.equal("Alex");
  });

});
