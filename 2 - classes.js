"use strict";

var should = require("chai").should();

describe("classes", function() {

  let sound = "dog";

  class Person { //clases are not hoisted, need declaring before using and they don't get attached to window.Person.
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

    var spiderMan = new Hero();

    spiderMan.should.be.an.instanceof(Person);
    spiderMan.should.be.an.instanceof(Hero);

  });

  it("must call super if extending and constructing", function() {

    class Villain extends Person {
      constructor() {
        //super(); //this would normally call Person.constructor
      }
    }

    //bloody confusing error message! Damn you red bear!
    should.throw(() => { let redBear = new Villain(); }, "this is not defined");

  });

  it("can have static methods and must not be called on instances", function() {

    class Lunch {
      static Standard() {
        return "Burrito size of face";
      }
    }

    Lunch.Standard().should.be.equal("Burrito size of face");

    let healthyLunch = new Lunch();

    //note this is not the error message I've seen in tutorials!
    should.throw(() => { healthyLunch.Standard(); }, "healthyLunch.Standard is not a function" );


  });

});
