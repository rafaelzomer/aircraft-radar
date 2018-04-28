export default {
  cartToPolar: function(x, y) {
    var r = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
    var m = y / x;
    var angle = this.radiansToDegrees(Math.atan(m));
    var angleSum = 0;
    if (x < 0 && y > 0) { //Segundo quadrante
      angleSum = 90;
    } else if (x < 0 && y < 0) { //Segundo quadrante
      angleSum = 180;
    } else if (x > 0 && y < 0) { //Terceiro quadrante 
      angleSum = 270;
    }
    return {
      a: angle + angleSum,
      r: r
    }
  },
  round: function(number) {
    return Math.round(number * 100) / 100;
  },
  radiansToDegrees: function(radians) {
    return radians * (180 / Math.PI);
  },
  degreesToRadians: function(degree) {
    return degree * Math.PI / 180;
  },
  polarToCart: function(r, a) {
    var angleInRadians = this.degreesToRadians(a);
    var xMult = this.round(Math.cos(angleInRadians));
    var yMult = this.round(Math.sin(angleInRadians));
    var x = r * xMult;
    var y = r * yMult;
    return {
      x: x,
      y: y
    }
  }  
}