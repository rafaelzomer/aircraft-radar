export default function Background() {
  this.render = function(canvas) {
    for (let i = 0; i < 8; i++) {
      canvas.drawCircle(0, 0, i*70);
    }
		canvas.drawLine(0, canvas.getMaxVertical());
		canvas.drawLine(0, canvas.getMaxVertical() * -1);
		canvas.drawLine(canvas.getMaxHorizontal(), 0);
		canvas.drawLine(canvas.getMaxHorizontal() * -1, 0);
  }
}