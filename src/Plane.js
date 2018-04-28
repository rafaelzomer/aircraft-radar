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
    var airplaneLength = 30;
    var airplaneWidth = 30;
    var img = new Image();
    img.onload = function() {
      context.save();
      context.translate(
        cordX - (airplaneLength/2), 
        cordY - (airplaneWidth/2)
      );
      context.translate(airplaneLength/2, airplaneWidth/2);
      context.rotate((_this.direction*-1)*Math.PI/180);
      context.drawImage(
        img,
        -airplaneLength/2, 
        -airplaneWidth/2 
      );
      context.restore();
    }
    img.src = planeImg;
  }

  _this.nextPosition = function(x, y, distance) {
    var nextX = 0;
    var nextY = 0;
    var relativeCord = move.moveToCenter(x, y);
    var cart = convert.polarToCart(distance, _this.direction);
    var convertedX = cart.x - relativeCord.x;
    var convertedY = cart.y - relativeCord.y;
    return {
      x: convertedX,
      y: convertedY
    };
  }

  _this.move = function() {
    // setInterval(function() {
      var nextPosition = _this.nextPosition(_this.x, _this.y, _this.velocity);
      _this.x = nextPosition.x;
      _this.y = nextPosition.y;
    // }, 50)
  }

  _this.move();
}