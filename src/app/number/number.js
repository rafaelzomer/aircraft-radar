
function round(num) {
  return Math.round(num * 100) / 100;
}

function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

function degreesToRadians(degree) {
  return degree * Math.PI / 180;
}

export default {
  radiansToDegrees,
  degreesToRadians,
  round
}