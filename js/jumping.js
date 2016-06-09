import {located, touching, ABOVE, BOTTOM} from './physics'

export default class Jumping {

  constructor(jumpSpeed) {
    this.grounded = false;
    this.jumpSpeed = jumpSpeed;
  }

  setEntity(entity) {
    this.entity = entity;
  }

  update(inputState, world) {
    var self = this;
    var entity = this.entity;
    var physics = entity.getBehavior('Physics');
    var jumping = inputState.jumping;

    self.grounded = false;
    world.getEntities()
    .filter((otherEntity) => entity !== otherEntity)
    .forEach((otherEntity) => {
      if (located(entity, ABOVE, otherEntity)) {
        if (touching(entity, BOTTOM, otherEntity)) {
          self.grounded = true;
        }
      }
    });

    if (jumping && self.grounded) {
      physics.deltaY += this.jumpSpeed;
    }
  };
}
