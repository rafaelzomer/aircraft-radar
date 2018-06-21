import planeTemplate from './plane.template.html';
import move from '../move';
import convert from '../convert';
import number from '../number';
import config from '../config';
import uiUtils from '../ui/uiUtils';

let Radar = document.querySelector('Radar');
let $planeTemplate = uiUtils.stringToHtml(planeTemplate);

function Plane({name, x, y, velocity, rotation}) {
  var id = uiUtils.generateHash();
  if (velocity < config.minVelocity) {
    throw 'o avião deve estar a mais de ' + config.minVelocity + ' km/h';
  }
  name = (name || uiUtils.generateHash()).toUpperCase();
  var props = {name, x, y, velocity, rotation};
  var engineOn = false; 
  let $plane = document.importNode($planeTemplate, true);
  let $descriptionList = $plane.querySelectorAll('.air-plane__desc div');
  var $description = $descriptionList[0];
  var $yNode = $descriptionList[1];
  var $xNode = $descriptionList[2];
  var $velocity = $descriptionList[3];

  function _init() {
    _engineRunner();
    _renderDescription();
    _renderVelocity();
    Radar.appendChild($plane);
  }

  function _render() {
    $plane.style.setProperty('--axis-x', props.x + 'px');
    $plane.style.setProperty('--axis-y', props.y + 'px');
    $plane.style.setProperty('--rotation', props.rotation + 'deg');
    $yNode.innerText = 'y' + number.round(props.y);
    $xNode.innerText = 'x' + number.round(props.x);
  }

  function _renderVelocity() {
    $velocity.innerText = number.round(props.velocity)+ ' km/h';
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
        var nextPosition = _nextPosition(props.x, props.y, _getConvertedVelocity());
        props.x = nextPosition.x;
        props.y = nextPosition.y;
      }
    }, config.timeout);
  }

  function _getConvertedVelocity() {
    return props.velocity / 400;
  }

  function _setX(value){
    props.x = value;
  }

  function _getX() {
    return props.x;
  }

  function _setY(value){
    props.y = value;
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
    render: _render,
    toggleEngine: _toggleEngine,
    nextPosition: _nextPosition
  }
}

export default Plane;
