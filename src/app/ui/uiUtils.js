import dotTemplate from './dot.html';
let Radar = document.querySelector('.air-radar__object');
let $dotTemplate = stringToHtml(dotTemplate);

function insertDot(x, y) {
  var dot = document.importNode($dotTemplate, true);
  dot.style.setProperty('--axis-x', x + 'px');
  dot.style.setProperty('--axis-y', y + 'px'); 
  Radar.appendChild(dot);
}

function stringToHtml(str) {
  let parser = new DOMParser(),
      dom = parser.parseFromString(str.replace(/>\s+</g,'><'), "text/html");
  return dom.body.firstChild;
}

function generateHash(){
  return Math.random().toString(36).substring(7);
}

export default {
  stringToHtml,
  generateHash,
  insertDot 
}