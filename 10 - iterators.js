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
      [Symbol.iterator] : iteratorFunction
    };

    it("should have a iterator defined with the key Symbol.iterator", function() {
      iterable.should.have.a.property(Symbol.iterator);
    });

    it("is used by for in loops", function(){

        class MovieGenre  {

          constructor(name, ...movies) {
            this.name = name;
            this.movies = movies;
          }

          get Name() {
            return this.name;
          }

          [Symbol.iterator]() {
            let counter = 0;

            //you can't have arrow functions in classes (yet - ES7) http://stackoverflow.com/a/31362350/141022
            //so you need to grab a reference to the class properties.
            let movies = this.movies;

            return { //created a closure, so has access to counter
              next : () => {
                let done = counter >= movies.length;
                let movie = movies[counter];

                counter++;

                return { done, value: movie };
              }
            }
          }
        }

        let action = new MovieGenre("action", "Die Hard", "Die Harder", "Die Hardest");

        let counter = 1;

        for(let movie of action) {
          if(counter === 3) {
            movie.should.be.equal("Die Hardest");
          }
          counter++;
        }

    });

  });

});
