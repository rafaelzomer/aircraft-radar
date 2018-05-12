import Util from '../../../utils';
import tableTemplate from './table.template.html';
import checkbox from '../checkbox/checkbox.js';

let $table = Util.stringToHtml(tableTemplate);


let $body = $table.querySelector('tbody');


function _render(){
  this.planes.map(plane => {
    
    let row = document.createElement("tr");
    let cell = document.createElement("td");


    cell.appendChild(document.importNode(checkbox, true));
    
    row.appendChild(cell);
    $body.appendChild(row);

  });

  console.log($body)
}

export default {
  planes: [],
  render: _render
}