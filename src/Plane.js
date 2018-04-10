import canvas from './canvas.js';

export default function Plane(x, y, code, altitude) {
  var _this = this;
  _this.x = -1000;
  _this.y = -1000;
  _this.code = "";
  _this.altitude = 0;
  _this.ctx;

  var init = function () {
    _this.x = x;
    _this.y = y;
    _this.code = code;
    _this.altitude = altitude;
    _this.ctx = canvas.getContext();
  }

  this.render = function () {
    _this.ctx.fillStyle = "#000000";
    _this.ctx.fillRect(_this.x, _this.y, 5, 5);

    _this.ctx.fillStyle = "#000000";
    _this.ctx.font = "10px Arial";
    _this.ctx.fillText(_this.code, _this.x + 10, _this.y);
    _this.ctx.fillText(_this.altitude, _this.x + 10, _this.y + 10);
  }
  init();
}