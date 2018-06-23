import translation from './translation';

function _run({x1,y1}, {x2, y2}){
  x2 = (x1 * (x2/100));
  y2 = (y2 * (y2/100));
  return translation.run({x1,y1}, {x2, y2})
}

export default {
  run: _run
}