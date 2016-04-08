"use strict"

var should = require('chai').should();

describe("var", function() {

  it("has function scope", function() {

    if(true) {
      var launchTheNukes = true;
    }

    should.exist(launchTheNukes);
  });
});

describe("let", function() {

  it("has block scope", function() {

    if(true) {
      let launchTheNukes = true;
    }

    should.throw(() => { launchTheNukes; });
  });
});

describe("const", function() {

  it("can only be set when declared", function() {

    const alexIsAwesome = true;
    should.throw(() => { alexIsAwesome = false;  })
  });

});
