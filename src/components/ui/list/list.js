import Util from '../../../utils';
import tableTemplate from './table.template.html';

let list = document.querySelector('List');

let $table = Util.stringToHtml(tableTemplate);

let $header = $table.querySelector('thead');

let $body = $table.querySelector('tbody');

function clean(el) {
  el.innerHTML = "";
}

function _setHeader(cols) {
  let row = document.createElement("tr");
  cols.map(c => {

    let cell = document.createElement("th");
    cell.innerText = c.text;
    for (let attribute in c.attrs) {

      cell[attribute] = c.attrs[attribute];

    }

    row.appendChild(cell);

  });
  $header.appendChild(row);
}

function _render() {
  clean($body);
  this.rows.map(r => {
    let row = document.createElement("tr");

    r.map(c => {
      let cell = document.createElement("td");

      if (c.type == 'element') {
        cell.appendChild(c.value);

      } else {
        cell.innerHTML = c.value;
      }

      for (let attribute in c.attrs) {
        cell[attribute] = c.attrs[attribute];
      }
      row.appendChild(cell);
    })
    // let cell = document.createElement("td");
    // cellCheckbox.appendChild(c);
    // row.appendChild(cellCheckbox);


    // let cellID = document.createElement("td");
    // let span = document.createElement("span");
    // span.className = "ellipsis";
    // span.innerText = r.id;
    // cellID.appendChild(span);
    // row.appendChild(cellID);


    // let cellX = document.createElement("td");
    // cellX.className = "text-center";
    // cellX.innerText = r.x;


    $body.appendChild(row);

  });

  list.appendChild($table);
}

function _addRow(row) {
  this.rows.push(row);
  this.render();
}

export default {
  rows: [],
  render: _render,
  addRow: _addRow,
  setHeader: _setHeader
}
