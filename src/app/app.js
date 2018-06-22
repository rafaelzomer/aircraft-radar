import Ui from './ui';
import config from './config';
import Report from './report';
import collision from './collision';

document.addEventListener("DOMContentLoaded", () => {
  var ui = new Ui();
  // var planes = [];
  // for (let i = 0; i < 10; i++) {
  //   var x = Math.floor(Math.random() * 600) - 300;
  //   var y = Math.floor(Math.random() * 600) - 300;
  //   var rotation = Math.floor(Math.random() * 360) + 1;
  //   var plane = new Plane({
  //     velocity: 380,
  //     x,
  //     y,
  //     rotation
  //   });
  //   planes.push(plane);
  // }
  // // planes.push(new Plane({
  // //   velocity: 800,
  // //   x: 0,
  // //   y: 70,
  // //   rotation: 225
  // // }));
  // // planes.push(new Plane({
  // //   velocity: 400,
  // //   x: -50,
  // //   y: 0,
  // //   rotation: 45
  // // }));

  // planes.map(function(pl) {
  //   ui.add(pl); 
  // });
  Report.addMessage('test', 'danger');
  var ret = collision.detectInList(ui.getPlanes());
  ret.map(col => {
    var name1 = col.plane1.getName();
    var name2 = col.plane2.getName();
    Report.addMessage(name1 + ' colidirá com ' + name2);
  });
  setInterval(function() {
    ui.update();
  }, config.timeout);
});