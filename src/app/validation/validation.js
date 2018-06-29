import notification from "../notification/notification";

function toDefined(value, mandatoryFieldName) {
  notification.hide();
  if (typeof value === 'undefined' || (typeof value !== 'string' && isNaN(value))) {
    var msg = 'Valor inválido';
    if (mandatoryFieldName) {
      msg = 'O campo "' + mandatoryFieldName + '" é inválido';
    }
    throw msg;
  }
  return value;
}

function toNumber(value, mandatoryFieldName) {
  value = new Number(value);
  value = toDefined(value, mandatoryFieldName);
  return value;
}

function toString(value, mandatoryFieldName) {
  notification.hide();
  value = toDefined(value, mandatoryFieldName);
  if (mandatoryFieldName && !value) {
    throw 'O campo "' + mandatoryFieldName + '" é obrigatório';
  }
  return value;
}

export default {
  toNumber,
  toString
}
