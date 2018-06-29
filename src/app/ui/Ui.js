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
import config from '../config';
import validation from '../validation';
import move from '../move';
import collision from '../collision';
import Report from '../report';
import proximity from '../proximity/proximity';
import number from '../number';
import notification from '../notification/notification';

function Ui() {
  var _objects = [];
  var _collisionMessages = [];
  var _selected = null;

  // Panels
  let $pnRegister = document.querySelector('#panelRegister');
  let $pnTransform = document.querySelector('#panelTransform');
  let $pnConfig = document.querySelector('#panelConfig');

  // Buttons
  let $btnAdd = document.querySelector('#btnAdd');
  let $btnAddRandom = document.querySelector('#btnAddRandom');
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

  let $inProximityPlane;
  let $inProximityAirport;
  let $inMinCollisionTime;

  //Group Buttons
  let $groupBtnPlane = document.querySelector('#groupBtnPlane');
  let $groupBtnPlaneRegister = document.querySelector('#groupBtnPlaneRegister');
  let $groupBtnPlaneTransform = document.querySelector('#groupBtnPlaneTransform');
  let $groupBtnConfig = document.querySelector('#groupBtnConfig');

  function _init() {

    _makeHeader();
    Tabs.render(_tabsCallback);

    setInterval(() => {
      time.update();
      _update();
    }, config.timeout);

    _registerListeners();
  }

  function _tabsCallback(tabName, $tabsetContent) {
    switch(tabName){
      case 'PROXIMIDADE': 
        _configProximity($tabsetContent);
        break;
      case 'COLISÃO': 
        _configColision($tabsetContent);
        break;
    }
  }

  function _configProximity(content) {
    $inProximityPlane = content.querySelector('#inProximityPlane');
    $inProximityAirport = content.querySelector('#inProximityAirport');

    $inProximityPlane.value = config.proximity;
    $inProximityAirport.value = config.airportDistance;
  }

  function _configColision(content) {
    $inMinCollisionTime = content.querySelector('#inMinCollisionTime');
    $inMinCollisionTime.value = config.minCollisionTime;
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
    _detectAirportProximity();
    _detectCollision(_selected);
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
      
      let center = move.moveToCenter(x2, y2);
      
      x1 += center.x;
      y1 += center.y;
      let {x, y} = rotation.run(x1, y1, angle);
      
      x -=  center.x;
      y -=  center.y;
      p.setX(x);
      p.setY(y);
    });
  }

  function _cancelTransform(){
    $pnTransform.classList.add('hide');
    $groupBtnPlaneTransform.classList.add('hide');
    $groupBtnPlane.classList.remove('hide');
    notification.hide();
  }

  function _showConfig(){
    $btnConfig.classList.add('hide');
    $pnConfig.classList.remove('hide');
    $groupBtnConfig.classList.remove('hide');
  }

  function _applyConfig(){
    let currentTab = Tabs.getActiveTab($pnConfig).innerText;

    switch(currentTab){
      case 'PROXIMIDADE':
        _setProximity();
        break;
      case 'COLISÃO':
        _setCollision();
        break;
    }
  }

  function _setProximity() {
    notification.hide();
    try {
      config.proximity = validation.toNumber($inProximityPlane.value, 'Distância mín. entre aviões');
      config.airportDistance = validation.toNumber($inProximityAirport.value, 'Prox. mín. do aeroporto');
      _detectCollision();
      _detectAirportProximity();
    } catch(e) {
      $inProximityPlane.value = config.proximity;
      $inProximityAirport.value = config.airportDistance;
      notification.error(e);
    }
  }

  function _setCollision() {
    notification.hide();
    try {
      config.minCollisionTime = validation.toNumber($inMinCollisionTime.value, 'Tempo mínimo');
      _detectCollision();
    } catch(e) {
      $inMinCollisionTime.value = config.minCollisionTime;
      notification.error(e);
    }
  }

  function _cancelConfig(){
    $btnConfig.classList.remove('hide');
    $pnConfig.classList.add('hide');
    $groupBtnConfig.classList.add('hide');
    notification.hide();
  }

  function _deletePlane(){
    // Excluir avião
  }

  function _registerListeners(){
    EventEmitter.run();
    
    $btnAdd.addEventListener('click', _showRegister, false);
    $btnAddRandom.addEventListener('click', _addRandom, false);
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
    notification.hide();
  }

  function _showRegister(e) {
    $pnTransform.classList.add('hide');
    $pnRegister.classList.remove('hide');
    $groupBtnPlane.classList.add('hide');
    $groupBtnPlaneRegister.classList.remove('hide');
    $groupBtnPlaneTransform.classList.add('hide');
  }

  function _addRandom() {
    var randomPlanes = [];
    var range = 500;
    for (let i = 0; i < 5; i++) {
      var x = Math.floor(Math.random() * range) - (range/2);
      var y = Math.floor(Math.random() * range) - (range/2);
      var rotation = Math.floor(Math.random() * 360) + 1;
      randomPlanes.push(new Plane({
        velocity: 380,
        x,
        y,
        rotation
      }));
    }
    // randomPlanes.push(new Plane({
    //   velocity: 800,
    //   x: -50,
    //   y: -50,
    //   rotation: 90
    // }));
    // randomPlanes.push(new Plane({
    //   velocity: 800,
    //   x: 50,
    //   y: 50,
    //   rotation: 180
    // }));

    for (let i = 0; i < randomPlanes.length; i++) {
      var p = randomPlanes[i];
      p.toggleEngine();
      _add(p);
      List.addPlane(p);
    }
    _detectCollision(randomPlanes);
    _detectAirportProximity();
  }

  function _addPlane() {
    notification.hide();
    try {
      var cart = {
        x: validation.toNumber($inPlaneX.value),
        y: validation.toNumber($inPlaneY.value)
      }
      if ($inPlaneRadius.value && $inPlaneAngle.value) {
        cart = convert.polarToCart($inPlaneRadius.value, $inPlaneAngle.value);
      }
      let plane = new Plane({
        name: validation.toString($inPlaneDesc.value, 'Descrição'),
        velocity: validation.toNumber($inPlaneVelocity.value, 'Velocidade'),
        x: cart.x,
        y: cart.y,
        rotation: validation.toNumber($inPlaneDirection.value, 'Rotação')
      });
      plane.toggleEngine();
      _detectCollision([plane]);
      _detectAirportProximity();
      _add(plane);
      List.addPlane(plane);
    } catch(e) {
      notification.error(e);
    }
  }

  function _detectCollision(specificPlanes) {
    var planes = _getPlanes();
    if (specificPlanes && specificPlanes.length) {
      for (let j = 0; j < specificPlanes.length; j++) {
        const specificPlane = specificPlanes[j];
        var specId = specificPlane.getId();
        var i = _collisionMessages.length
        while (i--) {
          const message = _collisionMessages[i];
          if (message.plane1.getId() == specId 
            || message.plane2.getId() == specId) {
            message.report.remove();
            _collisionMessages.splice(i, 1);
          }
        }
      }
    }
    var ret = collision.detectInList(planes, specificPlanes);
    ret.map(col => {
      var name1 = col.plane1.getName();
      var name2 = col.plane2.getName();
      var collisionTime = col.collisionTime;
      var report = Report.addMessage(name1 + ' colidirá com ' + name2 + ' em ' + number.format(collisionTime) + 's', 'danger');
      _collisionMessages.push({
        plane1: col.plane1,
        plane2: col.plane2,
        report
      });
    });
  }

  function _detectAirportProximity() {
    var ret = proximity.detectInList(_getPlanes());
    ret.map(col => {
      var name = col.plane.getName();
      var distance = number.format(col.distance);
      Report.addMessage('Distância do aeroporto: ' + name + ' está a ' + distance + 'km do aeroporto', 'warning');
    });
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
    add: _add,
    update: _update
  }
}

export default Ui;
