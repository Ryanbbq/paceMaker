var expect = require("chai").expect;

var add = require('./simple-function').add;
var multiply = require('./simple-function').multiply;

describe("Add function", function() {
    it("should return the sum of 2 numbers", function(done) {
        expect(add(2, 4)).to.equal(6);
        done();
    });
});

describe("Multiply function", function() {
    
    it("should return the multiplication of 2 numbers", function() {
        expect(multiply(5, 5)).to.equal(25);

    });
});