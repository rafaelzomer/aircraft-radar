const RANGE = 2;
import config from '../config';
import uiUtils from '../ui/uiUtils';
import convert from '../convert';

function _detectInList(planes) {
  var planesCloseFromAirport = [];
  for (let i = 0; i < planes.length; i++) {
    const plane = planes[i];
    var distance = _detect(plane);
    if (distance !== false) {
      planesCloseFromAirport.push({plane, distance});
    }
  }
  return planesCloseFromAirport;
}

function _detect(plane) {
  var polar = convert.cartToPolar(plane.getX(), plane.getY());
  if (polar.r < config.airportDistance) {
    return polar.r;
  }
  return false;
}


export default {
  detectInList: _detectInList,
  detect: _detect,
}
