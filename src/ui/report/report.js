import moment from 'moment';
let Report = document.querySelector('Report');

function _addMessage(message){
  var date = moment().format('DD/MM/YYYY hh:mm:ss');
  Report.innerText = '[' + date + '] ' + message + '\n' + Report.innerText; 
}

export default {
  addMessage: _addMessage,
};