import List from '../list';
import EventEmitter from '../../polyfill/emitter';
import checkbox from '../checkbox';
import time from '../time';
import tabs from '../tabs';
import Plane from '../plane/plane';

// let planes = [];

// function makeListHeader(){

//   List.setHeader([{
//     text: "",
//     attrs: {
//       width: 30
//     }
//   }, {
//     text: "Identificação",
//     attrs: {
//       width: 110
//     }
//   }, {
//     text: "x",
//     attrs: {
//       className: 'text-center'
//     }
//   }, {
//     text: "y",
//     attrs: {
//       className: 'text-center'
//     }
//   }, {
//     text: "r",
//     attrs: {
//       className: 'text-center'
//     }
//   }, {
//     text: "a",
//     attrs: {
//       className: 'text-center'
//     }
//   }, {
//     text: "v",
//     attrs: {
//       className: 'text-center'
//     }
//   }, {
//     text: "d",
//     attrs: {
//       className: 'text-center'
//     }
//   }]);
// }

// function init() {
//   EventEmitter.run();
//   makeListHeader();

//   return this;
// }

// function setPlanes(planes){
//   this.planes = planes;

//   this.planes.map(p => {
//     p.hash = Util.generateHash();
//     checkbox.setId(p.hash);
//     let span = document.createElement('span');
//     span.className = 'ellipsis';
//     span.innerText = p.id;

//     List.addRow([{
//         type: 'element',
//         value: checkbox.getNode()
//       },
//       { 
//         type: 'element',
//         value: document.importNode(span, true)
//       },
//       {
//         value: p.x,
//         attrs: {
//           className: 'text-center'
//         }
//       },
//       {
//         value: p.y,
//         attrs: {
//           className: 'text-center'
//         }
//       },
//       {
//         value: p.r,
//         attrs: {
//           className: 'text-center'
//         }
//       },
//       {
//         value: p.a,
//         attrs: {
//           className: 'text-center'
//         }
//       },
//       {
//         value: p.d,
//         attrs: {
//           className: 'text-center'
//         }
//       },
//       {
//         value: p.v,
//         attrs: {
//           className: 'text-center'
//         }
//       }
//     ]);
//   })
// }


function Ui() {
  var _objects = [];

  // Panels
  let $pnRegister = document.querySelector('#panelRegister');
  let $pnTransform = document.querySelector('#panelTransform');

  // Buttons
  let $btnAdd = document.querySelector('#btnAdd');
  let $btnSave = document.querySelector('#btnSave');
  let $btnCancelAdd = document.querySelector('#btnCancelAdd');

  // Inputs
  let $inPlaneDesc = document.querySelector('#inPlaneDesc');
  let $inPlaneX = document.querySelector('#inPlaneX');
  let $inPlaneY = document.querySelector('#inPlaneY');
  let $inPlaneAngle = document.querySelector('#inPlaneAngle');
  let $inPlaneRadius = document.querySelector('#inPlaneRadius');
  let $inPlaneVelocity = document.querySelector('#inPlaneVelocity');
  let $inPlaneDirection = document.querySelector('#inPlaneDirection');

  //Group Buttons
  let $groupBtnPlane = document.querySelector('#groupBtnPlane');
  let $groupBtnPlaneRegister = document.querySelector('#groupBtnPlaneRegister');

  function _init() {
    $btnAdd.addEventListener('click', _showRegister, false);
    $btnCancelAdd.addEventListener('click', _hideRegister, false);
    $btnSave.addEventListener('click', _addPlane, false);

    tabs.render();
    setInterval(() => {
      time.update();
    }, 100);
  }

  function _hideRegister(e) {
    $pnRegister.classList.add('hide');
    $groupBtnPlane.classList.remove('hide');
    $groupBtnPlaneRegister.classList.add('hide');
  }

  function _showRegister(e) {
    $pnRegister.classList.remove('hide');
    $groupBtnPlane.classList.add('hide');
    $groupBtnPlaneRegister.classList.remove('hide');
  }

  function _addPlane() {

    _validate([$inPlaneDesc, $inPlaneX, $inPlaneY, $inPlaneAngle, $inPlaneRadius, $inPlaneVelocity, $inPlaneDirection]);

    let plane = new Plane({
      name: new String($inPlaneDesc.value),
      velocity: new Number($inPlaneVelocity.value),
      x: new Number($inPlaneX.value),
      y: new Number($inPlaneY.value),
      angle: new Number($inPlaneAngle.value),
      radius: new Number($inPlaneRadius.value),
      direction: new Number($inPlaneDirection.value)
    });

    _add(plane);
  }

  function _validate(inputs) {
    inputs.map(el => {
      if (el.hasAttribute('required') && el.value == '') {
        throw new Error('Campo ' + el.id + ' é obrigatório')
      }
    })
  }

  function _add(object) {
    if (!object) {
      throw 'object is mandatory';
    }
    if (typeof object.render !== 'function') {
      throw 'object should have a render function';
    }
    _objects.push(object);
  }

  function _update() {
    for (let i = 0; i < _objects.length; i++) {
      const obj = _objects[i];
      obj.render();
    }
  }

  function _getPlanes() {
    return _objects;
  }

  _init();
  return {
    getPlanes: _getPlanes,
    add: _add,
    update: _update
  }
}

export default Ui;
