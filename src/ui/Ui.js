import Util from './utils';
import List from './list/list.js';
import EventEmitter from '../polyfill/emitter';
import checkbox from './checkbox/checkbox.js';
import time from './time/time';


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
  function _init() {
    setInterval(() => {
      time.update();
    }, 100);
  }

  function _add(object) {
    if (!object){
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

  _init();
  return {
    add: _add,
    update: _update
  }
}

export default Ui;
