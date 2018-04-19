import planeImg from './assets/plane.png';
import move from './move';
import convert from './convert';

export default function Plane(x, y, direction, code, velocity) {
  var _this = this;
  _this.x = x;
  _this.y = y;
  _this.direction = direction;
  _this.code = code;
  _this.velocity = velocity / 1000;
  _this.nextX = 0;
  _this.nextY = 0;

  this.render = function (canvas, context) {
    var cordX = canvas.getX(_this.x);
    var cordY = canvas.getY(_this.y);
    var comprimentoAviao = 30;
    var larguraAviao = 30;
    var img = new Image();
    img.onload = function() {
      context.save();
      context.translate(
        cordX - (comprimentoAviao/2), 
        cordY - (larguraAviao/2)
      );
      context.translate(comprimentoAviao/2, larguraAviao/2);
      context.rotate((_this.direction*-1)*Math.PI/180);
      context.drawImage(
        img,
        -comprimentoAviao/2, 
        -larguraAviao/2 
      );
      context.restore();
    }
    img.src = planeImg;
  }

  _this.nextPosition = function() {
    var nextX = 0;
    var nextY = 0;

    var relativeCord = move.moveToCenter(_this.x, _this.y);
    var polar = convert.cartToPolar(x, y);
    polar.r += _this.velocity;
    var cart = convert.polarToCart(polar.r, polar.a);
    return {
      x: cart.x + relativeCord.x,
      y: cart.y + relativeCord.y
    };
  }

  _this.move = function() {
    setInterval(function() {
      var nextPosition = _this.nextPosition();
      console.log('nextPosition', nextPosition);
      _this.x = nextPosition.x;
      _this.y = nextPosition.y;
    }, 1000)
  }

  _this.move();
}