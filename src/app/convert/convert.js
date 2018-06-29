import number from "../number";

export default {
  cartToPolar: function(x, y) {
    let r = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
    let m = y / x;
    // Referência: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
    let angle = number.radiansToDegrees(Math.atan2(y, x));
    return {
      a: angle,
      r: r
    }
  },
  polarToCart: function(r, a) {
    a = new Number(a);
    r = new Number(r);
    let angleInRadians = number.degreesToRadians(a);
    let xMult = number.round(Math.cos(angleInRadians));
    let yMult = number.round(Math.sin(angleInRadians));
    let x = r * xMult;
    let y = r * yMult;
    return {
      x: x,
      y: y
    }
  }  
}