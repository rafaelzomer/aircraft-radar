let $notification = document.querySelector('.air-notification');

function error(message) {
  $notification.classList.add('air-notification--error');
  $notification.innerText = message;
  show();
  throw message;
}

function hide() {
  $notification.classList.add('hide');
}

function show(){
  $notification.classList.remove('hide');
}

export default {
  error,
  hide
}
