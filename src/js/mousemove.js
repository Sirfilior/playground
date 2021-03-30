export default class MouseMove {
  constructor(object) {
    this.mouseDown = true;
    this.mouseX = 0;
    this.mouseY = 0;
    this.object = object;
    this.addMouseHandler(document.getElementsByTagName("canvas")[0]);
  }

  onMouseMove(evt) {
    if (!this.mouseDown) {
      return;
    }

    evt.preventDefault();

    var deltaX = evt.clientX - this.mouseX,
      deltaY = evt.clientY - this.mouseY;
    this.mouseX = evt.clientX;
    this.mouseY = evt.clientY;
    this.rotateScene(deltaX, deltaY);
  }

  addMouseHandler(canvas) {
    let self = this;
    canvas.addEventListener(
      "mousemove",
      function (e) {
        self.onMouseMove(e);
      },
      false
    );
  }

  rotateScene(deltaX, deltaY) {
    this.object.rotation.y += deltaX / 100;
    this.object.rotation.x += deltaY / 100;
  }
}

export { MouseMove };
