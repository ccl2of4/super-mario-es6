export default class Entity {

  constructor(width, height) {
    this.node = document.createElement('img');
    this.node.style.position = 'absolute';
    this.width(width);
    this.height(height);

    this.walkSpeed = 1;
    this.runFactor = 2;
    this.jumpSpeed = 20;
  }

  update(world) {
    let inputState = null;
    if (this.controller) {
      inputState = this.controller.getState();
    }
    if (this.animator) {
      this.animator.update(inputState);
    }
    if (this.physics) {
      this.physics.update(inputState, world);
    }
  }

  setController(controller) {
    if (typeof controller.setEntity !== 'undefined') {
      controller.setEntity(this);
    }

    this.controller = controller;
  }

  setAnimator(animator) {
    animator.setEntity(this);
    this.animator = animator;
  }

  setPhysics(physics) {
    physics.setEntity(this);
    this.physics = physics;
  }

  x(value) {
    if (typeof value !== 'undefined') {
      this.node.style.left = value;
    }
    return parseFloat(this.node.style.left);
  }

  frame() {
    return [
      this.left(),
      this.right(),
      this.bottom(),
      this.top()
    ]
  }

  y(value) {
    if (typeof value !== 'undefined') {
      this.node.style.bottom = value;
    }
    return parseFloat(this.node.style.bottom);
  }

  image(value) {
    if (typeof value !== 'undefined') {
      this.node.src = value;
    }
    return this.node.src;
  }

  left() {
    return this.x();
  }

  right() {
    return this.x() + this.width();
  }

  top() {
    return this.y() + this.height();
  }

  bottom() {
    return this.y();
  }

  width(value) {
    if (typeof value !== 'undefined') {
      this.node.width = value;
    }
    return this.node.width;
  }

  height(value) {
    if (typeof value !== 'undefined') {
      this.node.height = value;
    }
    return this.node.height;
  }

}
