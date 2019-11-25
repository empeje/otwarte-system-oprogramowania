const { describe, it } = require('mocha');
const biggestNumber = require('../src');
const chai = require('chai');

const { expect } = chai;

describe("Biggest Number Generator", () => {
  describe("Given array of numbers, return biggest number", () => {
    it('should return correct answer', () => {
      expect(biggestNumber([19, 20, 54, 50, 64, 42, 23])).to.equal(64545042232019);
    });

    it('should return correct answer', () => {
      expect(biggestNumber([54, 546, 548, 60])).to.equal(6054854654);
    });

    it('should return correct answer', () => {
      expect(biggestNumber([99,0,199,11])).to.equal(99199110);
    });

    it('should compare number as a whole not only the first digit', () => {
      expect(biggestNumber([598, 50, 100])).to.equal(59850100)
    });

    it('should handle same same number well', () => {
      expect(biggestNumber([90, 90, 90, 90, 90])).to.equal(9090909090)
    });
  });
});