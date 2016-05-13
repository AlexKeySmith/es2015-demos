"use strict";

require("chai").should();

var request = require('request-promise');

//mocha --harmony_proxy

describe("proxy", function() {
  it("can intercept getters", function() {

    class Person {
      constructor(name) {
        this.name = name;
      }
      get Name() {
        return this.name;
      }
    }

    let nameChangeHandler = {
      get(target, propKey, reciever) {
        return target[propKey] + "andra";
      }
    }

    let alex = new Person("Alex");

    let alexAtTheWeeked = new Proxy(alex, nameChangeHandler);

    alexAtTheWeeked.Name.should.be.equal("Alexandra");

  });


});
