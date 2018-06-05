import template from './checkbox.template.html';
import uiUtils from '../ui/uiUtils';

let checkbox = uiUtils.stringToHtml(template);

let input = checkbox.querySelector('input');
let label = checkbox.querySelector('label');

function getNode(){
  let clone = document.importNode(checkbox, true);
  
  clone.firstChild.addEventListener('change', function (e) {
    window.EventEmitter.emit('checkbox-item:change', {check: e.target.checked});
  }, true);

  return clone;
}

function setId(value){
  label.htmlFor = input.id = 'chbx-' + value;
}

export default {
  setId,
  getNode
};