const RANGE = 2;
import config from '../config';
import uiUtils from '../ui/uiUtils';

function _detectInList(planes) {
  var planesWillCollide = [];
  var planeListColide = [];
  for (let i = 0; i < planes.length; i++) {
    const plane1 = planes[i];
    planesWillCollide[i] = planesWillCollide[i] || {};
    for (let j = 0; j < planes.length; j++) {
      const plane2 = planes[j];
      planesWillCollide[j] = planesWillCollide[j] || {};
      if (planesWillCollide[i][j] || planesWillCollide[j][i] || i == j) {
        continue;
      }
      var willCollide = _detect(plane1, plane2);
      planesWillCollide[i][j] = willCollide;
      if (willCollide) {
        planeListColide.push({
          plane1,
          plane2
        });
      }
    }
  }
  return planeListColide;
}

function _continueNext(next) {
  if (!next) {
    return true;
  }
  if (next.x > -500 && next.x < 500 && next.y > -500 && next.y < 500) {
    return true;
  }
  return false;
}

function _distance({
  x1,
  y1,
  x2,
  y2
}) {
  var foo1 = Math.pow((x2 - x1), 2);
  var foo2 = Math.pow((y2 - y1), 2);
  var result = Math.sqrt(foo1 + foo2);
  return result;
}

function _inRange(next1, next2, cord) {
  return next1[cord] > next2[cord]-RANGE && next1[cord] < next2[cord]+RANGE;
}

function _detect(plane1, plane2) {
  var next1 = false;
  var next2 = false;
  var i = 0;
  while (_continueNext(next1) && _continueNext(next2)) {
    next1 = plane1.nextPosition(plane1.getX(), plane1.getY(), i);
    next2 = plane2.nextPosition(plane2.getX(), plane2.getY(), i);
    var diff = false;
    if (_inRange(next1, next2, 'y')) {
      diff = Math.abs(next1.x - next2.x);
    }
    if (_inRange(next1, next2, 'x')) {
      diff = Math.abs(next1.y - next2.y);
    }
    if (diff !== false) {
      if (diff < config.proximity) {
        var avgX = (next1.x + next2.x) / 2;
        var avgY = (next1.y + next2.y) / 2;
        uiUtils.insertDot(avgX, avgY);
        return {
          collisionPoint: {
            x: avgX,
            y: avgY
          },
          plane1: next1,
          plane2: next2
        };
      }
    }
    i++;
  }
  return false;
}

export default {
  detectInList: _detectInList,
  detect: _detect,
}
