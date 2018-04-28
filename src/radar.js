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
    var plane1 = new Plane(50, -250, 135, "WT-2341", 4000);
    var plane2 = new Plane(-250, -250, 90, "WT-2341", 4000);
    var plane3 = new Plane(145, 145, 256, "WT-2341", 4000);
    var plane4 = new Plane(0, 0, 3, "WT-2341", 4000);
    canvas.addObject(plane1);
    canvas.addObject(plane2);
    canvas.addObject(plane3);
    canvas.addObject(plane4);
    canvas.addObject(new Background());

    collision.detect(plane1, plane2);
    // setInterval(function() {
      canvas.update();
    // }, 50);
  }
}