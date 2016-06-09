function createEquals(traverseShallowConditionally) {
  'use strict';
  function equalElements (b, aitem, aindex) {
    return equals(aitem, b[aindex]);
  }
  function arraysEqual (a, b) {
    if (!(b instanceof Array)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    return a.every(equalElements.bind(null, b));
  }
  function equalProperties (b, aprop, apropname) {
    if (equals(aprop, b[apropname]) === false) {
      return false;
    }
  }
  function objectsEqual (a, b) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    if (traverseShallowConditionally(a, equalProperties.bind(null, b)) === false) {
      return false;
    }
    return true;
  }
  function equals (a, b) {
    var toa = typeof a, tob = typeof b;
    if (toa !== tob) {
      return false;
    }
    switch (toa) {
      case 'object': 
        if (a instanceof Array) {
          return arraysEqual(a, b);
        }
        return objectsEqual(a, b);
        break;
      default:
        return a === b;
    }
  }
  return equals;
}

module.exports = createEquals;
