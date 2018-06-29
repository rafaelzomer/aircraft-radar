let $notification = document.querySelector('.air-notification');

function error(message) {
  $notification.classList.remove('air-notification--info');
  $notification.classList.add('air-notification--error');
  $notification.innerText = message;
  show();
}

function info(message) {
  $notification.classList.remove('air-notification--error');
  $notification.classList.add('air-notification--info');
  $notification.innerText = message;
  show();
}

function hide() {
  $notification.classList.add('hide');
}

function show(){
  $notification.classList.remove('hide');
}

export default {
  error,
  info,
  hide
}
