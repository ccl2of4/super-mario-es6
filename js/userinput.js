var KEY_E = 69,
    KEY_Q = 81,
    KEY_W = 87,
    KEY_A = 65,
    KEY_S = 83,
    KEY_D = 68,
    KEY_ENTER = 13,
    KEY_LEFT = 37,
    KEY_RIGHT = 39,
    KEY_UP = 38,
    KEY_DOWN = 40,
    KEY_SPACE = 32;

function defaultKeyBindings() {
  return {
    moveLeft:   KEY_A,
    moveRight:  KEY_D,
    run:    KEY_S,
    jump:   KEY_SPACE
  };
};

export default class UserInput {

  constructor() {
    this.moveLeft = false;
	  this.moveRight = false;
    this.run = false;
    this.jump = false;
    this.keyBindings = defaultKeyBindings();

    let self = this;
    window.addEventListener('keydown', function(event) { self._down(event); }, false);
    window.addEventListener('keyup', function(event) { self._up(event); }, false);
  }

  getState() {
    return {
      direction:  this._getDirection(),
      walking:    this.moveLeft || this.moveRight,
      running:    this.run,
      jumping:    this.jump
    };
  };

  _getDirection() {
    if (this.moveLeft) {
      return -1
    }
    if (this.moveRight) {
      return 1;
    }
    return null;
  };

  _down(event) {
    for (var binding in this.keyBindings) {
      if (this.keyBindings[binding] == event.keyCode) {
        this[binding] = true;
      }
    }
	};

  _up(event) {
    for (var binding in this.keyBindings) {
      if (this.keyBindings[binding] == event.keyCode) {
        this[binding] = false;
      }
    }
	};

};
