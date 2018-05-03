import canvas from './canvas.js';
import collision from './collision.js';
import Plane from './Plane.js';
import Background from './Background.js';

export default {
  init: function() {
    // this.renderBase();
    this.renderPlanes();    
  },
  renderBase: function() {
    for (let i = 0; i < 8; i++) {
      canvas.drawCircle(0, 0, i*70);
    }
		canvas.drawLine(0, canvas.getMaxVertical());
		canvas.drawLine(0, canvas.getMaxVertical() * -1);
		canvas.drawLine(canvas.getMaxHorizontal(), 0);
		canvas.drawLine(canvas.getMaxHorizontal() * -1, 0);
  },
  renderPlanes: function() {
    var planes = [];
    planes[0] = new Plane(-230, 0, 270, "WT-2341", 4000);
    planes[1] = new Plane(50, -250, 135, "WT-2341", 4000);
    planes[2] = new Plane(-250, -250, 90, "WT-2341", 4000);
    planes[3] = new Plane(145, 145, 256, "WT-2341", 4000);
    planes[4] = new Plane(0, 0, 3, "WT-2341", 4000);
    canvas.addObject(planes[0]);
    // canvas.addObject(planes[1]);
    // canvas.addObject(planes[2]);
    // canvas.addObject(planes[3]);
    canvas.addObject(planes[4]);
    canvas.addObject(new Background());

    var planesWillCollide = [];
    for (let i = 0; i < planes.length; i++) {
      const plane1 = planes[i];
      planesWillCollide[i] = planesWillCollide[i] || {};
      for (let j = 0; j < planes.length; j++) {
        planesWillCollide[j] = planesWillCollide[j] || {};
        if (planesWillCollide[i][j] || planesWillCollide[j][i] || i == j) {
          continue;
        }
        const plane2 = planes[j];
        var willCollide = collision.detect(planes[i], planes[j]);
        console.warn('planes', i, '=', j, '/', willCollide);
        planesWillCollide[i][j] = willCollide;
      }
    }
    // setInterval(function() {
      canvas.update();
    // }, 50);
  }
}