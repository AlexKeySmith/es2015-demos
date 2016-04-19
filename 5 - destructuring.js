"use strict";

require("chai").should();

//mocha --harmony_destructuring

describe("object destructuring", function() {

  let person = {
    name: "James Bond",
    favouriteDrink: "Martini"
  };

  it("grabs values from an object", function() {


    let { name, favouriteDrink } = person;

    name.should.be.equal("James Bond");
    favouriteDrink.should.be.equal("Martini");
  });

  it("can be used in function parameters", function() {

    let func = function({name, favouriteDrink}, swarve) {
      name.should.be.equal("James Bond");
      favouriteDrink.should.be.equal("Martini");
      swarve.should.be.true;
    };

    func(person, true);
  });

  it("can define new paramter names", function() {

    //left hand side grabs the value
    let { name: actorName, favouriteDrink: drink } = person;

    actorName.should.be.equal("James Bond");
    drink.should.be.equal("Martini");

  });

  it.skip("needs brackets if you are not creating a variable", function() {
    let personName, personDrink;

    //this should work it doesn't!!!!
    /*
    ({name : personName, favouriteDrink : personDrink} = person);
    */
  });

});

describe("array destructuring", function() {

  let sizeValues = [10, 20, 30];

  it("can destructe arrays", function() {

    let [small, medium, large] = sizeValues;

    small.should.be.equal(10);
    medium.should.be.equal(20);
    large.should.be.equal(30);

  });

  it("can miss out a value", function() {

    let [small, , large] = sizeValues;

    small.should.be.equal(10);
    large.should.be.equal(30);

  });

  it("extracts nested arrays (doesn't create them)", function() {

    let stock = ["jumper", sizeValues]; //nested sizeValues.
    let [clothing, [small]] = stock;

    clothing.should.be.equal("jumper");

    small.should.be.equal(10); //note small isn't an array.

  });

  it("can use default paramters", function() {

    //note harmony_destructuring not harmony_default_parameters!
    let [small, medium, large, xlarge = 40] = sizeValues;

    xlarge.should.be.equal(40);

  });

});

describe("destructuring function parameters", function() {

  it("can be used to destructure arrays and objects", function() {

      var func = function([a,b], {x : xNew, y : yNew}) {
          a.should.be.equal(1);
          b.should.be.equal(2);
          xNew.should.be.equal(3);
          yNew.should.be.equal(4);
      };

      func([1, 2], {x: 3, y: 4});
  });

});
