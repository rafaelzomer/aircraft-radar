import intersection from './intersection.js';

export default {
    detect: function(plane1, plane2) {
        var next1 = plane1.nextPosition(plane1.x, plane1.y, 1000);
        var next2 = plane2.nextPosition(plane2.x, plane2.y, 1000);
        console.log('next1', next1);
        var inter = intersection.checkLineIntersection({
            startX1: plane1.x,
            startY1: plane1.y,
            endX1: next1.x,
            endY1: next1.y,
            startX2: plane2.x,
            startY2: plane2.y,
            endX2: next2.x,
            endY2: next2.y
        });
        var distancePlane1 = this.distance({
            x1: plane1.x,
            y1: plane1.y,
            x2: inter.x,
            y2: inter.y
        });
        var distancePlane2 = this.distance({
            x1: plane2.x,
            y1: plane2.y,
            x2: inter.x,
            y2: inter.y
        });
        var timePlane1 = distancePlane1 / plane1.velocity;
        var timePlane2 = distancePlane2 / plane2.velocity;
        console.log('2', timePlane1);
        console.log('2', timePlane2);
        return timePlane1 - timePlane2;
    }, 
    distance: function({x1, y1, x2, y2}) {
        var foo1 = Math.pow((x2 - x1), 2);
        var foo2 = Math.pow((y2 - y1), 2);
        var result = Math.sqrt(foo1 + foo2);
        return result;
    }
}