import notification from "../notification/notification";

function toDefined(value, mandatoryFieldName) {
  if (typeof value === 'undefined' || isNaN(value)) {
    var msg = 'Valor inválido';
    if (mandatoryFieldName) {
      msg = 'O campo "' + mandatoryFieldName + '" é inválido';
    }
    notification.error(msg);
  }
  return value;
}

function toNumber(value) {
  value = new Number(value);
  value = toDefined(value);
  return value;
}

function toString(value, mandatoryFieldName) {
  value = toDefined(value, mandatoryFieldName);
  if (mandatoryFieldName && !value) {
    notification.error('O campo "' + mandatoryFieldName + '" é obrigatório');
  }
  return value;
}

export default {
  toNumber,
  toString
}
