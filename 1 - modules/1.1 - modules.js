"use strict";

import * as mocha from "../bower_components/mocha/mocha.js"
import * as chai from "../bower_components/chai/chai.js"

import hello from "1 - dummyModule.js"

var should = chai.should();

describe("modules", function() {

  it("it should have a method called sayMessage", function() {
      hello.sayMessage.should.be.a("function");
  });
});
