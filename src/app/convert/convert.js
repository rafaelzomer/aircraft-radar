import number from "../number";
import config from "../config";

export default {
  cartToPolar: function(x, y) {
    let r = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
    let m = y / x;
    let angle = number.radiansToDegrees(Math.atan(m));
    return {
      a: angle,
      r: r
    }
  },
  polarToCart: function(r, a) {
    a = new Number(a);
    r = new Number(r);
    let angleInRadians = number.degreesToRadians(a);
    let xMult = number.round(Math.cos(angleInRadians));
    let yMult = number.round(Math.sin(angleInRadians));
    let x = r * xMult;
    let y = r * yMult;
    return {
      x: x,
      y: y
    }
  },
  kmToPixel: function(value) {
    if (!value) {
      return;
    }
    return value / config.pixelXKm;
  },
  pixelToKm: function(value) {
    if (!value) {
      return;
    }
    return value * config.pixelXKm;
  },
  secondsToHours: function(value) {
    if (!value) {
      return;
    }
    return value / 3600;
  },
  hoursToSeconds: function(value) {
    if (!value) {
      return;
    }
    return value * 3600;
  }  
}