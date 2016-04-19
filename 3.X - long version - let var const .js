"use strict";
(function() {

  var doStuffVar = function(flag) {
    if(flag)
    {
      var x = "hello";
    }
    return x; //x *should* be undefined
  }


  var result = doStuffVar(true);

  console.log("result is ", result);

})();



(function() {

  var doStuffLet = function(flag) {
    if(flag)
    {
      let x = "hello";
    }

    try {
      return x; //x is undefined
    } catch (e) {
      console.log("x should be undefined")
    }
  }

  var result = doStuffLet(true);

  console.log("result is ", result);

})();


(function() {

  var launchEventCode = "TOP_SECRET_LAUNCH_CODE";
  var lunchEventCode;

  var presisdentSandwichOrder = function(lunchOrder) {
    launchEventCode = lunchOrder; //Oh crap someone muddled up lunch and launch!

    console.log("Food Order: preparing a " + launchEventCode + " sandwich");
  }

  var validateLaunchCode = function(userLaunchCode, topSecretLaunchCode) {
    return userLaunchCode === topSecretLaunchCode;
  }

  var launchTheNukes = function(userLaunchCode, topSecretLaunchCode) {
    console.log("..validating launch code");
    if(validateLaunchCode(userLaunchCode, topSecretLaunchCode)) {
      console.log("NUKES LAUNCHED");
    } else {
      console.log("launch code invalid");
    }
  }

  setTimeout(() => presisdentSandwichOrder("marmite"), 800);

  setTimeout(function evilHacker() {
    launchTheNukes("cheese", launchEventCode);
  }, 500);

  setTimeout(function evilHacker() {
    launchTheNukes("jam", launchEventCode);
  }, 1000);

  setTimeout(function evilHacker() {
    launchTheNukes("marmite", launchEventCode);
  }, 2000);





})();
