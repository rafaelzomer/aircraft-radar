import convert from '../convert';

function _run(x, y, angle) {
  let { r, a } = convert.cartToPolar(x, y);
  a += angle;
  let cart = convert.polarToCart(r, a);
  console.log(cart.x, cart.y, a)
  return { x: cart.x, y: cart.y };
}

export default {
  run: _run
};
