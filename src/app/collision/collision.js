const RANGE = 2;
import config from '../config';
import convert from '../convert';

function _detectInList(planes, specificPlanes) {
  var planesWillCollide = {};
  var planeListColide = [];
  var planeList = planes;
  if (specificPlanes && specificPlanes.length) {
    planeList = specificPlanes;
  }
  for (let i = 0; i < planeList.length; i++) {
    const plane1 = planeList[i];
    const id1 = plane1.getId();
    planesWillCollide[id1] = planesWillCollide[id1] || {};
    for (let j = 0; j < planes.length; j++) {
      const plane2 = planes[j];
      const id2 = plane2.getId();
      planesWillCollide[id2] = planesWillCollide[id2] || {};
      if (planesWillCollide[id1][id2] || planesWillCollide[id2][id1] || id1 == id2) {
        continue;
      }
      var willCollide = _detect(plane1, plane2);
      planesWillCollide[id1][id2] = willCollide;
      if (willCollide) {
        planeListColide.push({
          plane1,
          plane2,
          collisionTime: willCollide.collisionTime,
          collisionPoint: willCollide.collisionPoint
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

function _inRange(next1, next2, cord) {
  return next1[cord] > next2[cord]-RANGE && next1[cord] < next2[cord]+RANGE;
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
      if (convert.pixelToKm(diff) < convert.metersToKm(config.proximity)) {
        var avgX = (next1.x + next2.x) / 2;
        var avgY = (next1.y + next2.y) / 2;
        var p1X = plane1.getX();
        var p1Y = plane1.getY();
        var p1Velocity = plane1.getVelocity();
        var distance = _distance({x1: avgX, y1: avgY, x2: p1X, y2: p1Y});
        if (distance) {
          var hours = convert.pixelToKm(distance) / p1Velocity;
          var seconds = convert.hoursToSeconds(hours);
          if (seconds < config.minCollisionTime) {
            return {
              collisionTime: seconds,
              collisionPoint: {
                x: avgX,
                y: avgY
              },
              plane1: next1,
              plane2: next2
            };
          }
        }
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
