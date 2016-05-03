"use strict";

require("chai").should();

describe("maps", function() {
  it("should allow you to use an object as a key", function() {

    var key = { alex : true };

    let peopleStatus = new Map();

    peopleStatus.set(key, "super dooper");

    peopleStatus.get(key)
      .should.be.equal("super dooper");
  });
});

describe("weakmap", function() {
  it("should remove the value when the key is garbage collected", function(done) {

    var meal = {
      starter : {
        bread : {
          type : "garlic bread"
        }
      }
    };

    var weakMap = new WeakMap();

    weakMap.set(meal.starter.bread, "yummy");

    weakMap.get(meal.starter.bread)
      .should.be.equal("yummy");

    weakMap.has(meal.starter.bread).should.be.true;

    let timesChecked = 0;

    let checkGarbageHasBeenCollected = function() {

      var hasKey = weakMap.has(meal.starter.bread);


      if(!hasKey) {

        console.log(timesChecked);
        done();
      }

      timesChecked++;
    };


    setInterval(checkGarbageHasBeenCollected, 0);

    setTimeout(function() {
      meal.starter = {
        soup : {
          type: "tomato"
        }
      };
    }, 1000);

  });
});
