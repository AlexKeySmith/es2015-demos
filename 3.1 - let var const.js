"use strict"

var should = require('chai').should();

describe("var", function() {

  it("has function scope", function() {

    if(true) {
      var launchTheNukes = true;
    }

    should.exist(launchTheNukes);
  });

  it("can be redeclared", function() {
    var secretLaunchCode = "sa90239rofakho90asdasdasdy3r";
    var secretLaunchCode = "password";

    secretLaunchCode.should.equal("password");
  });

});

describe("let", function() {

  it("has block scope", function() {

    if(true) {
      let launchTheNukes = true;
    }

    should.throw(() => { launchTheNukes; });
  });

  it("cannot be redeclared in the same scope", function() {
    let secretLaunchCode = "sa90239rofakho90asdasdasdy3r";

    //syntax error here
    //let secretLaunchCode = "password";
  });

  it("can be redeclared in another scope, but stays in it's scope", function() {
    let name = "Alex";

    {
      let name = "Alex's Nemisis"
    }

    name.should.equal("Alex");
  });

});

describe("const", function() {

  it("can only be set when declared", function() {

    const alexIsAwesome = true;
    should.throw(() => { alexIsAwesome = false;  })
  });

});
