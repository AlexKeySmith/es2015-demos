"use strict";

require("chai").should();

describe("iterators", function() {

  var iteratorFunction = function() {
    return {
      next() { //note new es6 property shorthand, no need for function name
        return {done: true};
      }
    }
  };

  it("is defined using the iterator protocol", function() {
    var iterator = iteratorFunction();

    iterator.should.be.a("object");
    iterator.should.have.a.property("next").and.should.be.a("function");
    iterator.next().should.have.a.property("done", true);
  });


  describe("iterables", function() {
    var iterable = {
      [Symbol.iterator] : iteratorFunction()
    };

    it("should have a iterator defined with the key Symbol.iterator", function() {
      iterable.should.have.a.property(Symbol.iterator);
    });

  });

});
