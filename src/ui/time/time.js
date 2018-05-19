import moment from 'moment';
let Time = document.querySelector('Time');
let $date = Time.querySelector('.air-time__date');
let $hour = Time.querySelector('.air-time__hour');

function _update(){
  $date.innerText = moment().format('DD/MM/YYYY'); 
  $hour.innerText = moment().format('hh:mm:ss'); 
}

export default {
  update: _update,
};