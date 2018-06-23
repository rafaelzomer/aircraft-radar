import template from './checkbox.template.html';
import uiUtils from '../ui/uiUtils';

let checkbox = uiUtils.stringToHtml(template);

let input = checkbox.querySelector('input');
let label = checkbox.querySelector('label');

function getNode(){
  let clone = document.importNode(checkbox, true);
  
  clone.firstChild.addEventListener('change', function (e) {
    window.EventEmitter.emit('checkbox-item:change', {target: e.target});
  }, true);

  return clone;
}

function setId(value){
  label.htmlFor = input.id = 'checkbox-' + value;
  input.setAttribute('data-plane-id', value);
}

export default {
  setId,
  getNode
};