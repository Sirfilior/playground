export default class MouseMove {
  constructor(object) {
    //Set origin for mouse movement to middle of screen
    this.widthRef = window.innerWidth / 2;
    this.heightRef = window.innerHeight / 2;
    this.mouseXOrig = this.widthRef;
    this.mouseYOrig = this.heightRef;
    //Increase this to move more wih mosue, respect scence boundaries!
    this.maxMove = 0.4;
    //Increase this to rotate the object more
    this.maxRoateFactor = 0.5;
    //Assign webgl object
    this.object = object;
    //Assign cursor element
    this.initialX = object.position.x;
    this.initialY = object.position.y;
    this.initialXRot = this.object.rotation.x;
    this.initialYRot = this.object.rotation.y;
    this.addMouseHandler(document.getElementsByTagName("body")[0]);
  }

  onMouseMove(evt) {
    evt.preventDefault();
    //Get new mouse position and calculate delta
    var deltaX = this.mouseXOrig - evt.clientX,
      deltaY = this.mouseYOrig - evt.clientY;
    //Calculate mouse movement in percentage to current window size (only in 10% increments)
    var moveX = this.maxMove * (deltaX / this.widthRef),
      moveY = this.maxMove * (deltaY / this.heightRef);
    this.moveObject(moveX, moveY);
    //Also move custom cursor
  }

  addMouseHandler(elem) {
    let self = this;
    elem.addEventListener(
      "mousemove",
      function (e) {
        self.onMouseMove(e);
      },
      false
    );
  }

  moveObject(x, y) {
    //Invert x to move in correct direction
    x = x * -1;
    this.object.rotation.y = this.initialXRot + x * this.maxRoateFactor * -1;
    this.object.rotation.x = this.initialYRot + y * this.maxRoateFactor;
    this.object.position.x = this.initialX + x;
    this.object.position.y = this.initialY + y;
  }
}

export { MouseMove };
