import tableTemplate from './table.template.html';
import uiUtils from '../ui/uiUtils';
import radio from '../radio';
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

function _render() {
  clean($body);
  ROWS.map(r => {
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
    // cellRadio.appendChild(c);
    // row.appendChild(cellRadio);


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
  radio.setId(plane.getId());
  _addRow([{
      type: 'element',
      value: radio.getNode()
    },
    {
      type: 'element',
      value: document.importNode(span, true)
    },
    {
      value: plane.getX(),
      attrs: {
        className: 'text-center'
      }
    },
    {
      value: plane.getY(),
      attrs: {
        className: 'text-center'
      }
    },
    {
      value: plane.getRadius(),
      attrs: {
        className: 'text-center'
      }
    },
    {
      value: plane.getAngle(),
      attrs: {
        className: 'text-center'
      }
    },
    {
      value: plane.getRotation(),
      attrs: {
        className: 'text-center'
      }
    },
    {
      value: plane.getVelocity(),
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
