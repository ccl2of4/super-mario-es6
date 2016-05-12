var E = 69,
    Q = 81,
    W = 87,
    A = 65,
    S = 83,
    D = 68,
    ENTER = 13,
    LEFTARROW = 37,
    RIGHTARROW = 39,
    UPARROW = 38,
    DOWNARROW = 40,
    SPACE = 32;

export default class UserInput {

  constructor() {
    this.left = false;
	  this.right = false;
	  this.space = false;
    this.down = false;


    let self = this;
    window.addEventListener('keydown', function(event) { self._down(event); }, false);
    window.addEventListener('keyup', function(event) { self._up(event); }, false);
  }

  getState() {
    var isMoving = this.left || this.right;

    return {
      direction:  this._getDirection(),
      walking:    isMoving,
      running:    this.down && isMoving,
      jumping:    this.space
    };
  };

  _getDirection() {
    if (this.left) {
      return -1
    }
    if (this.right) {
      return 1;
    }
    return null;
  };

  _down(key) {
    if(key.keyCode == DOWNARROW || key.keyCode == S)
      this.down = true;
    else if(key.keyCode == LEFTARROW || key.keyCode == A)
      this.left = true;
    else if(key.keyCode == RIGHTARROW || key.keyCode == D)
      this.right = true;
    else if(key.keyCode == SPACE)
      this.space = true;
	};

  _up(key) {
    if(key.keyCode == DOWNARROW || key.keyCode == S)
      this.down = false;
      else if(key.keyCode == LEFTARROW || key.keyCode == A)
      this.left = false;
      else if(key.keyCode == RIGHTARROW || key.keyCode == D)
      this.right = false;
    else if(key.keyCode == SPACE)
      this.space = false;
	};

};
