import canvas from './canvas.js';
import Plane from './Plane.js';


export default {
    init: function() {
        this.renderBase();
        this.renderPlanes();    
    },
    renderBase: function() {
        canvas.drawCircle(300, 300, 50);
        canvas.drawCircle(300, 300, 130);
        canvas.drawCircle(300, 300, 210);
        canvas.drawCircle(300, 300, 290);

		canvas.drawLine(0, 300, 600, 300);
		canvas.drawLine(300, 0, 300, 600); 
    },
    renderPlanes: function() {
        new Plane(210, 220, "WT-2341", 8000).render();
        new Plane(500, 120, "CS-7211", 3000).render();
    }
}