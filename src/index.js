
require('normalize.css/normalize.css');
require('./styles/index.css');

import radar from './radar.js';

document.addEventListener("DOMContentLoaded", () => {
  radar.init();
});
