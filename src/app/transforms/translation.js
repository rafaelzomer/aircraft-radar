function _run({x1,y1}, {x2, y2}){
  let x = x1 + x2;
  let y = y1 + y2;
  return {x, y}
}

export default {
  run: _run
}