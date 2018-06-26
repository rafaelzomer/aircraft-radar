import notification from "../notification/notification";

function toDefined(value) {
  if (typeof value === 'undefined' || isNaN(value)) {
    notification.error('Valor inválido');
  }
  return value;
}

function toNumber(value) {
  value = new Number(value);
  value = toDefined(value);
  return value;
}

export default {
  toNumber
}
