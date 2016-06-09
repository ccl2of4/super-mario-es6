export default class Walking {

  constructor(walkSpeed, runFactor) {
    this.walkSpeed = walkSpeed;
    this.runFactor = runFactor;
  }

  setEntity(entity) {
    this.entity = entity;
  }

  update(inputState, world) {
    var self = this;
    var entity = this.entity;
    var physics = entity.getBehavior('Physics');
    var { direction, walking, running } = inputState;

    var maxSpeed = this.walkSpeed;
    if (running) {
      maxSpeed *= this.runFactor;
    }

    if (walking) {
      var sign = physics.deltaX >= 0 ? 1 : -1;
      if (Math.abs(physics.deltaX) < maxSpeed || sign != direction) {
        physics.deltaX += direction;
      }
    }

    if (!walking || Math.abs(physics.deltaX) > maxSpeed) {
      var vel = Math.max(0, Math.abs(physics.deltaX) - 1);
      sign = physics.deltaX >= 0 ? 1 : -1;
      physics.deltaX = vel * sign;
    }
  };
}
