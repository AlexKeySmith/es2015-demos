"use strict"

var should = require("chai").should();
var assert = require('chai').assert;




describe("symbols", function() {
  it("is defined using Symbol() without new", function() {
    const SYMBOL = Symbol();

    SYMBOL.should.be.an("symbol");

  });

  it("is not the same as another Symbol()", function() {
    let symbol1 = Symbol("A");
    let symbol2 = Symbol("A");

    symbol1.should.not.equal(symbol2);
  });

  it("is  useful for where you'd use enums", function() {

    const const_BLUE = Symbol();
    const const_RED = Symbol();
    const const_GREEN = Symbol();
    const const_YELLOW = Symbol();

    var complimentaryColour = function(colour) {
      switch(colour) {
        case  const_BLUE :
          return const_RED;
        case  const_GREEN :
          return const_YELLOW;
        default:
          throw "bad colour";
      }
    }

    var green = "red"; //uh oh someone has made a mistake, lukcy we are using symbols!

    should.throw(() => complimentaryColour(green), "bad colour");
  });

  it("has a global registry", function() {
    let symbol1 = Symbol.for("test");
    let symbol2 = Symbol.for("test");

    //symbol1.should.equal(symbol2); //daesn't work oddly, perhaps a chai gotcha.
    assert(symbol1 === symbol2);
  });

  it("can be used as a property name to avoid classhes ", function() {

    const NAME = Symbol();

    class Person  {

      constructor (name) {
        this._name = name;
      }

      get [NAME]() {
        return this._name;
      }
    }

    let person = new Person("Alex");

    person[NAME].should.be.equal("Alex");

    //it also is very useful for functions... such as iterators.

  });

});
