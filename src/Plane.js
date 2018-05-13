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
    setInterval(function() {
      var nextPosition = _this.nextPosition(_this.x, _this.y, _this.velocity);
      _this.x = nextPosition.x;
      _this.y = nextPosition.y;
    }, 50)
  }

  _this.move();
}