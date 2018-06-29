import planeTemplate from './plane.template.html';
import move from '../move';
import convert from '../convert';
import number from '../number';
import config from '../config';
import uiUtils from '../ui/uiUtils';
const DANGER_CLASS = 'air-plane--danger'
const SELECTED_CLASS = 'air-plane--selected'

let Radar = document.querySelector('.air-radar__object');
let $planeTemplate = uiUtils.stringToHtml(planeTemplate);

function Plane({name, x, y, velocity, rotation}) {
  var _callbacks = [];
  var id = uiUtils.generateHash();
  if (velocity < config.minVelocity) {
    throw 'o avião deve estar a mais de ' + config.minVelocity + ' km/h';
  }

  name = (name || uiUtils.generateHash()).toUpperCase();
  var props = {name, x, y, velocity, rotation};
  var engineOn = false; 
  let $plane = document.importNode($planeTemplate, true);
  var $description = $plane.querySelector('.air-plane__id');

  function _init() {
    _engineRunner();
    _renderDescription();
    Radar.appendChild($plane);
  }

  function _remove(){
    $plane.remove();
  }

  function _render() {
    $plane.style.setProperty('--axis-x', props.x + 'px');
    $plane.style.setProperty('--axis-y', props.y + 'px');
    $plane.style.setProperty('--rotation', props.rotation + 'deg');
  }

  function _renderDescription() {
    $description.innerText = props.name;
  }

  function _toggleEngine() {
    engineOn = !engineOn;
  }

  function _nextPosition(x, y, distance) {
    var nextX = 0;
    var nextY = 0;
    var relativeCord = move.moveToCenter(x, y);
    var cart = convert.polarToCart(distance * _getConvertedVelocity(), props.rotation);
    var convertedX = cart.x - relativeCord.x;
    var convertedY = cart.y - relativeCord.y;
    return {
      x: convertedX,
      y: convertedY
    };
  }

  function _engineRunner() {
    setInterval(function() {
      if (engineOn) {
        var nextPosition = _nextPosition(props.x, props.y, 1);
        props.x = nextPosition.x;
        props.y = nextPosition.y;
      }
    }, config.timeout);
  }

  function _getConvertedVelocity() {
    return convert.kmToPixel(props.velocity) * convert.secondsToHours(config.timeout / 1000);
  }

  function _setX(value){
    props.x = value;
    _call();
  }

  function _getX() {
    return props.x;
  }

  function _setY(value){
    props.y = value;
    _call();
  }

  function _getY() {
    return props.y;
  }

  function _getName() {
    return props.name;
  }

  function _getId() {
    return id;
  }

  function _getRadius() {
    return number.round(convert.cartToPolar(_getX(), _getY()).r);
  }

  function _getAngle() {
    return number.round(convert.cartToPolar(_getX(), _getY()).a);
  }

  function _getRotation() {
    return number.round(props.rotation);
  }

  function _getVelocity() {
    return number.round(props.velocity);
  }

  function _onPropUpdate(callback) {
    _callbacks.push(callback);
  }

  function _call() {
    for (let i = 0; i < _callbacks.length; i++) {
      const call = _callbacks[i];
      call && call(props);
    }
  }

  function _setStatus(isDanger) {
    props.isDanger = isDanger;
    if (isDanger) {
      $plane.classList.add(DANGER_CLASS);
    } else {
      $plane.classList.remove(DANGER_CLASS);
    }
    _call();
  }

  function _setSelected(isSelected) {
    if (isSelected) {
      $plane.classList.add(SELECTED_CLASS);
    } else {
      $plane.classList.remove(SELECTED_CLASS);
    }
    _call();
  }

  _init();
  return {
    getX: _getX,
    setX: _setX,
    getY: _getY,
    setY: _setY,
    getName: _getName,
    getId: _getId,
    getRadius: _getRadius,
    getAngle: _getAngle,
    getRotation: _getRotation,
    getVelocity: _getVelocity,
    getConvertedVelocity: _getConvertedVelocity,
    remove: _remove,
    render: _render,
    toggleEngine: _toggleEngine,
    setStatus: _setStatus,
    setSelected: _setSelected,
    onPropUpdate: _onPropUpdate,
    nextPosition: _nextPosition
  }
}

export default Plane;
