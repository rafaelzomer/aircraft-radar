import Ui from '../ui';
import Plane from '../ui/plane';
import collision from './collision';
import config from './config';
import report from '../ui/report/report';

document.addEventListener("DOMContentLoaded", () => {
  var ui = new Ui();
  var planes = [];
  for (let i = 0; i < 10; i++) {
    var x = Math.floor(Math.random() * 600) - 300;
    var y = Math.floor(Math.random() * 600) - 300;
    var rotation = Math.floor(Math.random() * 360) + 1;
    var plane = new Plane({
      velocity: 1,
      x,
      y,
      rotation
    });
    planes.push(plane);
  }
  // planes.push(new Plane({
  //   velocity: 1,
  //   x: 50,
  //   y: 50,
  //   rotation: 180
  // }));
  // planes.push(new Plane({
  //   velocity: 1,
  //   x: -50,
  //   y: -50,
  //   rotation: 90
  // }));

  planes.map(function(pl) {
    ui.add(pl); 
  });
  setInterval(function() {
    var ret = collision.detectInList(planes);
    ret.map(col => {
      var name1 = col.plane1.getName();
      var name2 = col.plane2.getName();
      report.addMessage(name1 + ' vai bater no ' + name2);
    });
    ui.update();
  }, config.timeout);
});