import List from '../list';
import EventEmitter from '../../polyfill/emitter';
import Checkbox from '../checkbox';
import time from '../time';
import Tabs from '../tabs';
import Plane from '../plane/plane';
import convert from '../convert';
import translation from '../transforms/translation';
import scaling from '../transforms/scaling';
import rotation from '../transforms/rotation';

function Ui() {
  var _objects = [];
  var _selected = null;

  // Panels
  let $pnRegister = document.querySelector('#panelRegister');
  let $pnTransform = document.querySelector('#panelTransform');
  let $pnConfig = document.querySelector('#panelConfig');

  // Buttons
  let $btnAdd = document.querySelector('#btnAdd');
  let $btnSave = document.querySelector('#btnSave');
  let $btnDelete = document.querySelector('#btnDelete');
  let $btnCancelAdd = document.querySelector('#btnCancelAdd');
  let $btnApplyTransform = document.querySelector('#btnApplyTransform');
  let $btnCancelTransform = document.querySelector('#btnCancelTransform');
  let $btnConfig = document.querySelector('#btnConfig');
  let $btnApplyConfig = document.querySelector('#btnApplyConfig');
  let $btnCancelConfig = document.querySelector('#btnCancelConfig');

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
  let $groupBtnPlaneTransform = document.querySelector('#groupBtnPlaneTransform');
  let $groupBtnConfig = document.querySelector('#groupBtnConfig');

  function _init() {

    _makeHeader();
    Tabs.render();

    setInterval(() => {
      time.update();
    }, 100);

    _registerListeners();
  }

  function _applyTransform(){
    let currentTab = Tabs.getActiveTab($pnTransform).innerText;

    switch(currentTab){
      case 'TRANSLAÇÃO':
        _setTranslation();
        break;
      case 'ESCALONAMENTO':
        _setScaling();
        break;
      case 'ROTAÇÃO':
        _setRotation();
        break;
      default:
        throw new Error('Transformação não reconhecida');
    }
  }

  function _setTranslation(){
    let $inTranslationX = document.querySelector('#inTranslationX');
    let $inTranslationY = document.querySelector('#inTranslationY');

    _selected.map(p => {
      let x1 = p.getX();
      let y1 = p.getY();
  
      let x2 = new Number($inTranslationX.value);
      let y2 = new Number($inTranslationY.value);
  
      let {x, y} = translation.run({x1, y1}, {x2, y2});
  
      p.setX(x);
      p.setY(y);

    });
  }

  function _setScaling(){
    let $inScalingX = document.querySelector('#inScalingX');
    let $inScalingY = document.querySelector('#inScalingY');

    _selected.map(p => {
      let x1 = p.getX();
      let y1 = p.getY();

      let x2 = new Number($inScalingX.value);
      let y2 = new Number($inScalingY.value);

      let {x, y} = scaling.run({x1, y1}, {x2, y2});

      p.setX(x);
      p.setY(y);
    });
  }

  function _setRotation(){
    
    let $inRotationAngle = document.querySelector('#inRotationAngle');
    let $inRotationX = document.querySelector('#inRotationX');
    let $inRotationY = document.querySelector('#inRotationY');

    _selected.map(p => {
      let x1 = p.getX();
      let y1 = p.getY();

      let angle = new Number($inRotationAngle.value);
      let x2 = new Number($inRotationX.value);
      let y2 = new Number($inRotationY.value);

      let {x, y} = rotation.run({x1, y1}, {angle, x2, y2});

      p.setX(x);
      p.setY(y);
    });
  }

  function _cancelTransform(){
    $pnTransform.classList.add('hide');
    $groupBtnPlaneTransform.classList.add('hide');
    $groupBtnPlane.classList.remove('hide');
  }

  function _showConfig(){
    $btnConfig.classList.add('hide');
    $pnConfig.classList.remove('hide');
    $groupBtnConfig.classList.remove('hide');
  }

  function _applyConfig(){
    // Altera configurações
  }

  function _cancelConfig(){
    $btnConfig.classList.remove('hide');
    $pnConfig.classList.add('hide');
    $groupBtnConfig.classList.add('hide');
  }

  function _deletePlane(){
    // Excluir avião
  }

  function _registerListeners(){
    EventEmitter.run();
    
    $btnAdd.addEventListener('click', _showRegister, false);
    $btnCancelAdd.addEventListener('click', _hideRegister, false);
    $btnSave.addEventListener('click', _addPlane, false);
    $btnDelete.addEventListener('click', _deletePlane, false);
    $btnApplyTransform.addEventListener('click', _applyTransform, false);
    $btnCancelTransform.addEventListener('click', _cancelTransform, false);
    $btnConfig.addEventListener('click', _showConfig, false);
    $btnApplyConfig.addEventListener('click', _applyConfig, false);
    $btnCancelConfig.addEventListener('click', _cancelConfig, false);

    window.EventEmitter.on('checkbox-item:change', function(obj){

      _selected = [];

      document.querySelectorAll('.air-table [type=checkbox]:checked').forEach(el => {
        _selected.push(_getPlaneById(el.getAttribute('data-plane-id')));
      });
      
      if(_selected.length){
        $pnRegister.classList.add('hide');
        $pnTransform.classList.remove('hide');
        $groupBtnPlane.classList.add('hide');
        $groupBtnPlaneRegister.classList.add('hide');
        $groupBtnPlaneTransform.classList.remove('hide');
      } else {
        $pnTransform.classList.add('hide');
        $groupBtnPlane.classList.remove('hide');
        $groupBtnPlaneTransform.classList.add('hide');
      }
    });
  }

  function _getPlaneById(id){
    return _getPlanes()
              .filter(plane => plane.getId() == id)[0];
  }

  function _makeHeader(){
    List.setHeader([{
      text: "",
      attrs: {
        width: 30
      }
    }, {
      text: "ID",
      attrs: {
        width: 55
      }
    }, {
      text: "x",
      attrs: {
        className: 'text-center'
      }
    }, {
      text: "y",
      attrs: {
        className: 'text-center'
      }
    }, {
      text: "r",
      attrs: {
        className: 'text-center'
      }
    }, {
      text: "a",
      attrs: {
        className: 'text-center'
      }
    }, {
      text: "v",
      attrs: {
        className: 'text-center'
      }
    }, {
      text: "d",
      attrs: {
        className: 'text-center'
      }
    }]);
  }

  function _hideRegister(e) {
    $pnRegister.classList.add('hide');
    $groupBtnPlane.classList.remove('hide');
    $groupBtnPlaneRegister.classList.add('hide');
  }

  function _showRegister(e) {
    $pnTransform.classList.add('hide');
    $pnRegister.classList.remove('hide');
    $groupBtnPlane.classList.add('hide');
    $groupBtnPlaneRegister.classList.remove('hide');
    $groupBtnPlaneTransform.classList.add('hide');
  }

  function _addPlane() {

    for (let i = 0; i < 10; i++) {
      var x = Math.floor(Math.random() * 600) - 300;
      var y = Math.floor(Math.random() * 600) - 300;
      var rotation = Math.floor(Math.random() * 360) + 1;
      var plan = new Plane({
        velocity: 380,
        x,
        y,
        rotation
      });
      _add(plan);
      List.addPlane(plan);
    }

    _validate([$inPlaneDesc, $inPlaneVelocity, $inPlaneDirection]);

    var cart = {
      x: new Number($inPlaneX.value),
      y: new Number($inPlaneY.value)
    }
    if ($inPlaneRadius.value && $inPlaneAngle.value) {
      cart = convert.polarToCart($inPlaneRadius.value, $inPlaneAngle.value);
    }
    let plane = new Plane({
      name: new String($inPlaneDesc.value),
      velocity: new Number($inPlaneVelocity.value),
      x: cart.x,
      y: cart.y,
      rotation: new Number($inPlaneDirection.value)
    });
    plane.toggleEngine();
    _add(plane);
  }

  function _validate(inputs) {
    inputs.map(el => {
      if (el.hasAttribute('required') && el.value == '') {
        var label = document.querySelector('[for="'+el.id+'"]');
        alert('Campo ' + label.innerText + ' é obrigatório');
        //throw new Error('Campo ' + el.id + ' é obrigatório')
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
