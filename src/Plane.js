import canvas from './canvas.js';
import planeImg from './assets/plane.png';

export default function Plane(x, y, rotate, code, altitude) {
  var _this = this;
  _this.x = -1000;
  _this.y = -1000;
  _this.rotate = rotate;
  _this.code = "";
  _this.altitude = 0;
  _this.ctx;

  var init = function () {
    _this.x = canvas.getX(x);
    _this.y = canvas.getY(y);
    _this.code = code;
    _this.altitude = altitude;
    _this.ctx = canvas.getContext();
  }

  this.render = function () {
    var comprimentoAviao = 30;
    var larguraAviao = 30;
    var img = new Image();
    img.onload = function() {
      _this.ctx.save();
      _this.ctx.translate(
        _this.x - (comprimentoAviao/2), 
        _this.y - (larguraAviao/2)
      );
      _this.ctx.translate(comprimentoAviao/2, larguraAviao/2);
      _this.ctx.rotate((_this.rotate*-1)*Math.PI/180);
      _this.ctx.drawImage(
        img,
        -comprimentoAviao/2, 
        -larguraAviao/2 
      );
      _this.ctx.restore();
    }
    img.src = planeImg;
  }
  init();
}