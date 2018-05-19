var indexOf;

if (typeof Array.prototype.indexOf === 'function') {
  indexOf = function (haystack, needle) {
    return haystack.indexOf(needle);
  };
} else {
  indexOf = function (haystack, needle) {
    var i = 0,
      length = haystack.length,
      idx = -1,
      found = false;
    while (i < length && !found) {
      if (haystack[i] === needle) {
        idx = i;
        found = true;
      }

      i++;
    }
    return idx;
  };
};
