var context = {};
var canvasElement = {};

document.addEventListener("DOMContentLoaded", () => {
  canvasElement = document.getElementById("canvas");
  context = canvasElement.getContext("2d");
});

export default {
  getWidth() {
    return canvasElement.width;
  },
  getHeight() {
    return canvasElement.height;
  },
  getMaxVertical() {
    return this.getHeight() / 2;
  },
  getMaxHorizontal() {
    return this.getWidth() / 2;
  },
  getContext: function () {
    return context;
  },
  drawLine: function (x, y, x2, y2) {
    context.strokeStyle = "#46A546";
    context.beginPath();
    context.moveTo(this.getX(x), this.getY(y));
    context.lineTo(this.getX(x2 || 0), this.getY(y2 || 0));
    context.stroke();
  },
  drawText: function (message) {
    context.font = "30px Arial Narrow";
    context.fillText(message, 50, 50);
  },
  drawCircle: function (x, y, r) {
    context.beginPath();
    context.strokeStyle = "#46A546";
    context.arc(this.getX(x), this.getY(y), r, 0, 2.0 * Math.PI);
    context.stroke();
  },
  drawRect: function () {
    context.fillStyle = "blue";
    context.fillRect(0, 0, 10, 10);
  },
  clearCanvas: function () {
    context.clearRect(0, 0, 600, 600);
  }, 
  getX: function(x) {
    return (this.getWidth()/2) + x;
  }, 
  getY: function(y) {
    return (this.getHeight()/2) + (y*-1);
  }
}