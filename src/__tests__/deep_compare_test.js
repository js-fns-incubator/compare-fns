var deepCompare = require('../deep_compare');

describe('deepCompare', function() {
  context('when all the values has equal types', function() {
    context('strings comparsion', function() {
      it('returns true if passed strings are equal', function() {
        var result = deepCompare('string', 'string');
        expect(result).to.be.true;
      });

      it('returns false if passed strings are not equal', function() {
        var result = deepCompare('string', 'str');
        expect(result).to.be.false;
      });
    });

    context('numbers comparsion', function() {
      it('returns true if passed numbers are equal', function() {
        var result = deepCompare(42, 42);
        expect(result).to.be.true;
      });

      it('returns false if passed numbers are not equal', function() {
        var result = deepCompare(42, 41);
        expect(result).to.be.false;
      });
    });

    context('objects comparsion', function() {
      it('returns true if objects are deeply equal', function() {
        var result = deepCompare(
          { a: { b: { c: 'C', d: 'D' } } },
          { a: { b: { c: 'C', d: 'D' } } }
        );
        expect(result).to.be.true;
      });

      it('returns false if objects are not deeply equal', function() {
        var result = deepCompare(
          { a: { b: { c: 'C', d: 'D' } } },
          { a: { b: { c: 'C', D: 'd' } } }
        );
        expect(result).to.be.false;
      });

      it('compares number of keys', function() {
        var result = deepCompare(
          { a: { b: { c: 'C', d: 'D' } } },
          { a: { b: { c: 'C', d: 'D', e: 'E' } } }
        );
        expect(result).to.be.false;
      });
    });

    context('arrays comparsion', function() {
      it('returns true if arrays are deeply equal', function() {
        var result = deepCompare(
          [1, 2, [3, 4, [5, 6]]],
          [1, 2, [3, 4, [5, 6]]]
        );
        expect(result).to.be.true;
      });

      it('returns false if arrays are not deeply equal', function() {
        var result = deepCompare(
          [1, 2, [3, 4, 5]],
          [1, 2, [3, 4, 6]]
        );
        expect(result).to.be.false;
      });

      it('compares length', function() {
        var result = deepCompare(
          [1, 2, [3, 4, 5]],
          [1, 2, [3, 4, 5, 6]]
        );
        expect(result).to.be.false;
      });
    });

    context("null's and undefined's comparsion", function() {
      it('returns false for null vs undefined', function() {
        var result = deepCompare(
          { a: { b: null } },
          { a: { b: undefined } }
        );
        expect(result).to.be.false;
      });

      it('returns false for undefined vs null', function() {
        var result = deepCompare(
          { a: { b: undefined } },
          { a: { b: null } }
        );
        expect(result).to.be.false;
      });
    });

    context('dates comparsion', function() {
      it('returns true for equal dates', function() {
        var result = deepCompare(
          { a: { b: new Date(11, 1, 1987) } },
          { a: { b: new Date(11, 1, 1987) } }
        );
        expect(result).to.be.true;
      });

      it('returns false for not equal dates', function() {
        var result = deepCompare(
          { a: { b: new Date(11, 1, 1987) } },
          { a: { b: new Date(10, 6, 1989) } }
        );
        expect(result).to.be.false;
      });
    });

    context('booleans comparsion', function() {
      it('returns true if passed booleans are equal', function() {
        var result = deepCompare(true, true);
        expect(result).to.be.true;
      });

      it('returns false if passed booleans are not equal', function() {
        var result = deepCompare(true, false);
        expect(result).to.be.false;
      });
    });
  });

  context('with mixed types', function() {
    it('returns false for object and array', function() {
      var result = deepCompare([], {});
      expect(result).to.be.false;
    });

    it('returns false for number and string', function() {
      var result = deepCompare(1, '1');
      expect(result).to.be.false;
    });
  });
});

