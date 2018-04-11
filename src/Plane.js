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
    var degrees = 0;
    var comprimentoAviao = 30;
    var larguraAviao = 30;
    // _this.ctx.beginPath();
    // _this.ctx.moveTo(canvas.getX(100), canvas.getY(100));
    _this.ctx.fillRect(
      _this.x, _this.y,
      5, 
      5
    );
    // _this.ctx.lineTo(canvas.getX(200), canvas.getY(200));
    // _this.ctx.stroke();
    // _this.ctx.drawImage(planeImg, 0, 0);

    var img = new Image();
    img.onload = function() {
      // _this.ctx.rotate(degrees*Math.PI/180);
      // _this.ctx.translate(_this.x, _this.y);
      _this.ctx.translate(
        canvas.getX(0) - (comprimentoAviao/2), 
        canvas.getY(0) - (larguraAviao/2)
      );
      // _this.ctx.translate(0, 0);
      // _this.ctx.drawImage(img, _this.x, _this.y);
      // _this.ctx.translate(0 - (comprimentoAviao/2), 0 - (larguraAviao/2));
      _this.ctx.rotate((_this.rotate*-1)*Math.PI/180);
      // _this.ctx.translate(30, 10);
      _this.ctx.drawImage(
        img,
        0, 
        // 0 - (comprimentoAviao/2), 
        // 15, 
        // 100 - (larguraAviao/2), 
        // 5, 
        // 0,
        0,
        comprimentoAviao, 
        larguraAviao
      );
      // _this.ctx.translate(_this.x, _this.y);
    }
    img.src = planeImg;

    // _this.ctx.fillStyle = "#000000";
    // _this.ctx.font = "10px Arial";
    // _this.ctx.fillText(_this.code, _this.x + 10, _this.y);
    // _this.ctx.fillText(_this.altitude, _this.x + 10, _this.y + 10);
  }
  init();
}