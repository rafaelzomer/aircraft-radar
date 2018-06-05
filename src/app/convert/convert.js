import number from "../number";

export default {
  cartToPolar: function(x, y) {
    var r = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
    var m = y / x;
    var angle = number.radiansToDegrees(Math.atan(m));
    var angleSum = 0;
    if (x < 0 && y > 0) { //Segundo quadrante
      angleSum = 90;
    } else if (x < 0 && y < 0) { //Terceiro quadrante
      angleSum = 180;
    } else if (x > 0 && y < 0) { //Quarto quadrante 
      angleSum = 270;
    }
    return {
      a: angle + angleSum,
      r: r
    }
  },
  polarToCart: function(r, a) {
    var angleInRadians = number.degreesToRadians(a);
    var xMult = number.round(Math.cos(angleInRadians));
    var yMult = number.round(Math.sin(angleInRadians));
    var x = r * xMult;
    var y = r * yMult;
    return {
      x: x,
      y: y
    }
  }  
}