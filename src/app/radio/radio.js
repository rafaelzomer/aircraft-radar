import template from './radio.template.html';
import uiUtils from '../ui/uiUtils';

let radio = uiUtils.stringToHtml(template);

let input = radio.querySelector('input');
let label = radio.querySelector('label');

function getNode(){
  let clone = document.importNode(radio, true);
  
  clone.firstChild.addEventListener('change', function (e) {
    window.EventEmitter.emit('radio-item:change', {target: e.target});
  }, true);

  return clone;
}

function setId(value){
  label.htmlFor = input.id = 'radio-' + value;
  input.setAttribute('data-plane-id', value);
}

export default {
  setId,
  getNode
};