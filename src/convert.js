export default {
  cartToPolar: function(x, y) {
    var r = Math.sqrt(Math.pow(x, 2) + Math.pow(x, 2));
    var angle = Math.atan2(x, y);
    return {
      a: angle,
      r: r
    }
  },
  polarToCart: function(r, a) {
    return {
      x: r * Math.cos(a),
      y: r * Math.sin(a)
    }
  }  
}