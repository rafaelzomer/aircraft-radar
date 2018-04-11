import canvas from './canvas.js';
import Plane from './Plane.js';


export default {
    init: function() {
        this.renderBase();
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
		// canvas.drawLine(0, canvas.getHeight(), 0, 0);
		// canvas.drawLine(300, 0, 300, 600); 
    },
    renderPlanes: function() {
        new Plane(50, 50, 0, "WT-2341", 8000).render();
        new Plane(50, 50, 90, "WT-2341", 8000).render();
        // new Plane(500, 120, "CS-7211", 3000).render();
    }
}