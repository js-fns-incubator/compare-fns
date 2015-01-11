/**
 * Deeply compare two values.
 *
 * @param {*} subjA
 * @param {*} subjB
 *
 * @returns {Boolean}
 */
var deepCompare = function(subjA, subjB) {
  // Data types must be equal
  if (typeof subjA != typeof subjB) {
    return false;

  // Compare null & undefined with ===
  } else if (!subjA || !subjB) {
    return subjA === subjB;

  // Compare objects (arrays, objects & object instances)
  } if (typeof subjA == 'object') {

    // Constructors must be equal
    if (subjA.constructor != subjB.constructor) {
      return false;

    // Compare dates
    } else if(subjA.constructor == Date) {
      return subjA.getTime() == subjB.getTime();

    // Compare arrays & objects
    } else {
      var subjAKeys = Object.keys(subjA);
      var subjBKeys = Object.keys(subjB);

      if (subjAKeys.length != subjBKeys.length) return false;

      for (var i = 0; i < subjAKeys.length; i++) {
        var key = subjAKeys[i];
        if (!deepCompare(subjA[key], subjB[key])) return false;
      }

      return true;
    }

  // Compare rest data types (numbers, strings and booleans)
  } else {
    return subjA === subjB;
  }
};

module.exports = deepCompare;

