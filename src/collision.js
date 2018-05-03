import intersection from './intersection.js';

export default {
    detect: function(plane1, plane2) {
        var next1 = false;
        var next2 = false;
        var i = 0;
        while(this._continueNext(next1) && this._continueNext(next2)) {
            next1 = plane1.nextPosition(plane1.x, plane1.y, i);
            next2 = plane2.nextPosition(plane2.x, plane2.y, i);
            var diff = false;
            if (next1.y == next2.y) {
                diff = Math.abs(next1.x - next2.x);
            }
            if (next1.x == next2.x) {
                diff = Math.abs(next1.y - next2.y);
            }
            if (diff !== false) {
                if (diff < 30) {
                    return {plane1: next1, plane2: next2};
                }
            }
            i++;
        }
        return false;
    }, 
    _continueNext: function(next) {
        if (!next) {
            return true;
        }
        if (next.x > -500 && next.x < 500 && next.y > -500 && next.y < 500){
            return true;
        }
        return false;
    },
    distance: function({x1, y1, x2, y2}) {
        var foo1 = Math.pow((x2 - x1), 2);
        var foo2 = Math.pow((y2 - y1), 2);
        var result = Math.sqrt(foo1 + foo2);
        return result;
    }
}