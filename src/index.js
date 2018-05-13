import style from './styles/index.scss';

//import radar from './radar.js';

import ui from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
  // radar.init();

  let planes = [];

  planes.push(
    {
      id: 'WT-9776',
      x: 0,
      y: 0,
      r: 0,
      a: 0,
      d: 0,
      v: 0
    },
    {
      id: 'WT-9776',
      x: 0,
      y: 0,
      r: 0,
      a: 0,
      d: 0,
      v: 0
    }
  );
  ui.init().setPlanes(planes);

});
