import Ui from './ui';
import config from './config';
import Report from './report';
import collision from './collision';

document.addEventListener("DOMContentLoaded", () => {
  var ui = new Ui();
  Report.addMessage('Radar iniciado');
});