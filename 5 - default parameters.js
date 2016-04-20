"use strict";

//default parameters aren't yet working in nodejs.
//https://github.com/nodejs/node/issues/3070
//mocha --harmony_default_parameters

require("chai").should();

describe("default parameters", function() {

  it("can be defined as a constant", function() {

    let func = function(name, geek = true) {
      return geek;
    }

    var isGeek = func("Alex");
    isGeek.should.be.true;
  });

  it("arguments hidden variable remains backwards compatible", function() {

    let func = function(name, geek = true) {
      arguments.length.should.be.equal(1);
    }

    func("Alex");
  });

  it("can reference earlier parameters", function() {

    let func = function(price, maxPrice = price) {
      maxPrice.should.be.equal(5);
    }

    func(5);

  });

  it("can have dynamic defaults", function() {

    let func = function(price,  numberOfPeople = 1, totalCost = defaultPrice * numberOfPeople) {
      numberOfPeople.should.be.equal(2);
      totalCost.should.be.equal(10);
    }

    func(5, 2, 10);

  });

  it("can reference variables outside it's scope", function() {

    let defaultPrice = 5;

    let func = function(price = defaultPrice) {
      price.should.be.equal(5);
    }

    func(5);

  });

});
