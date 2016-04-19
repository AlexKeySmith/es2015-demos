"use strict";


require("chai").should();

class Person {
  oldWay() {
    return function() {
      return this;
    }
  }
  newWay() {
    return () => {
      return this;
    }
  }
}


describe("arrow functions", function() {

  it("can be used as a call back", function() {

    function echo(message, callback) {
      var echoedMessage = message + " " + message;
      callback(echoedMessage);
    };

    echo("hello", (echoedMessage) => {

        echoedMessage.should.equal("hello hello");
    });

  });

  describe("'this' scope", () => {

    let person;

    beforeEach(function() {
       person = new Person();
    });

    it("has dynamic scope for functions", function() {

      var thisViaAFunction = person.oldWay();

      person.should.not.deep.equals(thisViaAFunction());
    });

    it("has lexical scope for arrow functions", function() {

      var thisViaAnArrowFunction = person.newWay();

      person.should.deep.equals(thisViaAnArrowFunction());
    });
  });
});
