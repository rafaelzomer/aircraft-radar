import move from '../move';
import convert from '../convert';

function _run({x1,y1}, {angle, x2, y2}){
  let center = move.moveToCenter(x2, y2);

  let x = x1 + center.x;
  let y = y1 + center.y;
  console.log(x, y)
  let {r, a} = convert.cartToPolar(x, y);
  console.log(r, a)
  a = a + angle;
  let cart = convert.polarToCart(r ,a);
  x = cart.x;
  y = cart.y;
  
  x = x - center.x;
  y = y - center.y;

  return {x, y}
}

export default {
  run: _run
}