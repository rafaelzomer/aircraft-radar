import reportTemplate from './report.template.html';
import uiUtils from '../ui/uiUtils';
import moment from 'moment';

let $reportTemplate = uiUtils.stringToHtml(reportTemplate);

let Report = document.querySelector('.air-report');
let typesClass = {
  'info': 'air-report__item--info',
  'warning': 'air-report__item--warning',
  'danger': 'air-report__item--danger'
}

function _addMessage(message, type = 'info'){
  let $item = document.importNode($reportTemplate, true);
  var date = moment().format('hh:mm:ss');

  $item.classList.add(typesClass[type]);

  let $time = $item.querySelector('.air-report__item-time');
  $time.innerText = date;

  let $desc = $item.querySelector('.air-report__item-desc');
  $desc.innerText = message;

  Report.insertBefore($item, Report.childNodes[0]); 
}

export default {
  addMessage: _addMessage,
};