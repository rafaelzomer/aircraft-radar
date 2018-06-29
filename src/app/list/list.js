import tableTemplate from './table.template.html';
import uiUtils from '../ui/uiUtils';
import checkbox from '../checkbox';
import number from '../number';
const ROWS = [];
const DANGER_CLASS = 'danger'

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

function _removePlane(id) {
  let row;
  ROWS.map((r, i) => {
    r.map(c => {
      if(c.type == 'element' && c.value.classList.contains('air-checkbox')){
        let $cbx = c.value.firstChild;
        if($cbx.dataset.planeId == id){
          row = i;
        }
      }
    });
  });

  ROWS.splice(row, 1);
  _render();
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
    $body.appendChild(row);

  });

  list.appendChild($table);
}

function _addPlane(plane) {
  let span = document.createElement('span');
  span.className = 'ellipsis';
  span.innerText = plane.getName();
  checkbox.setId(plane.getId());

  let $xNode = document.createElement('span');
  let $yNode = document.createElement('span');
  let $rNode = document.createElement('span');
  let $aNode = document.createElement('span');

  function setProps(props) {
    $xNode.innerText = number.format(plane.getX());
    $yNode.innerText = number.format(plane.getY());
    $rNode.innerText = number.format(plane.getRadius());
    $aNode.innerText = number.format(plane.getAngle());
    var tr = $xNode.closest('tr');
    if (!tr) {
      return;
    }
    if (props && props.isDanger) {
      tr.classList.add(DANGER_CLASS);
    } else {
      tr.classList.remove(DANGER_CLASS);
    }
  }
  setProps();
  _addRow([{
      type: 'element',
      value: checkbox.getNode()
    },
    {
      type: 'element',
      value: document.importNode(span, true)
    },
    {
      type: 'element',
      value: $xNode,
      attrs: {
        className: 'text-center'
      }
    },
    {
      type: 'element',
      value: $yNode,
      attrs: {
        className: 'text-center'
      }
    },
    {
      type: 'element',
      value: $rNode,
      attrs: {
        className: 'text-center'
      }
    },
    {
      type: 'element',
      value: $aNode,
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
  plane.onPropUpdate(function(props) {
    setProps(props);
  });
}

function _addRow(row) {
  ROWS.push(row);
  _render();
}

export default {
  render: _render,
  addPlane: _addPlane,
  addRow: _addRow,
  removePlane: _removePlane,
  setHeader: _setHeader
}
