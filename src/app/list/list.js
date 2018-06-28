import tableTemplate from './table.template.html';
import uiUtils from '../ui/uiUtils';
import checkbox from '../checkbox';
import number from '../number';
const ROWS = [];

let list = document.querySelector('List');

let $table = uiUtils.stringToHtml(tableTemplate);

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

function _handleClick(e){
  let $row;
  let $checkbox;
  if(e.target.parentElement.nodeName == 'TR'){
    $row = e.target.parentElement;
  } else {
    $row = e.target.parentElement.parentElement;
  }
  $checkbox = $row.querySelector('[type=checkbox]');
  $checkbox.click();
}

function _render() {
  clean($body);
  ROWS.map(r => {
    let row = document.createElement("tr");
    row.addEventListener('click', _handleClick);
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

function _addPlane(plane) {
  let span = document.createElement('span');
  span.className = 'ellipsis';
  span.innerText = plane.getName();
  checkbox.setId(plane.getId());
  _addRow([{
      type: 'element',
      value: checkbox.getNode()
    },
    {
      type: 'element',
      value: document.importNode(span, true)
    },
    {
      value: number.format(plane.getX()),
      attrs: {
        className: 'text-center'
      }
    },
    {
      value: number.format(plane.getY()),
      attrs: {
        className: 'text-center'
      }
    },
    {
      value: number.format(plane.getRadius()),
      attrs: {
        className: 'text-center'
      }
    },
    {
      value: number.format(plane.getAngle()),
      attrs: {
        className: 'text-center'
      }
    },
    {
      value: number.format(plane.getVelocity()),
      attrs: {
        className: 'text-center'
      }
    },
    {
      value: number.format(plane.getRotation()),
      attrs: {
        className: 'text-center'
      }
    }
  ]);
}

function _addRow(row) {
  ROWS.push(row);
  _render();
}

export default {
  render: _render,
  addPlane: _addPlane,
  addRow: _addRow,
  setHeader: _setHeader
}
