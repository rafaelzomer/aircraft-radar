import canvas from './canvas.js';
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
    canvas.addObject(new Plane(50, 50, 180, "WT-2341", 8000));
    canvas.addObject(new Plane(-50, -50, 90, "WT-2341", 8000));
    canvas.addObject(new Background());

    // setInterval(function() {
      canvas.update();
    // }, 200);
  }
}