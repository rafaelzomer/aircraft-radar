var context = {};

document.addEventListener("DOMContentLoaded", () => {
  var c = document.getElementById("myCanvas");
  context = c.getContext("2d");
});

export default {
  getContext: function () {
    return context;
  },
  drawLine: function (x, y, x2, y2) {
    context.strokeStyle = "#46A546";
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x2, y2);
    context.stroke();
  },
  drawText: function (message) {
    context.font = "30px Arial Narrow";
    context.fillText(message, 50, 50);
  },
  drawCircle: function (x, y, r) {
    context.beginPath();
    context.strokeStyle = "#46A546";
    context.arc(x, y, r, 0, 2.0 * Math.PI);
    context.stroke();
  },
  drawRect: function () {
    context.fillStyle = "blue";
    context.fillRect(0, 0, 10, 10);
  },
  clearCanvas: function () {
    context.clearRect(0, 0, 600, 600);
  }
}