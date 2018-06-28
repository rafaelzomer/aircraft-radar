import convert from '../convert';

function _run(x, y, angle){
  
  let {r, a} = convert.cartToPolar(x, y);
  a += angle;
  let cart = convert.polarToCart(r ,a);
  if(a > 90 && a < 180) {
    if(x < 0 && y > 0 && cart.x > 0 && cart.y < 0){
      cart.x *= -1;
      cart.y *= -1;
    }
  }
  return { x: cart.x, y: cart.y}
}

export default {
  run: _run
}