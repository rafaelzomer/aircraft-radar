export default {
    checkLineIntersection: function ({
      startX1,
      startY1,
      endX1,
      endY1,
      startX2,
      startY2,
      endX2,
      endY2
    }) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
      x: null,
      y: null,
      onLine1: false,
      onLine2: false
    };
    denominator = ((endY2 - startY2) * (endX1 - startX1)) - ((endX2 - startX2) * (endY1 - startY1));
    if (denominator == 0) {
        return result;
    }
    a = startY1 - startY2;
    b = startX1 - startX2;
    numerator1 = ((endX2 - startX2) * a) - ((endY2 - startY2) * b);
    numerator2 = ((endX1 - startX1) * a) - ((endY1 - startY1) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = startX1 + (a * (endX1 - startX1));
    result.y = startY1 + (a * (endY1 - startY1));
/*
        // it is worth noting that this should be the same as:
        x = startX2 + (b * (endX2 - startX2));
        y = startX2 + (b * (endY2 - startY2));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
  }
};