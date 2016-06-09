import {located, touching, BEHIND, INFRONT, RIGHT, LEFT} from './physics'

export default class StairClimbing {

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
    var { walking, direction } = inputState;

    if (!walking) {
      return;
    }

    world.getEntities()
      .filter(otherEntity => entity !== otherEntity)
      .forEach(otherEntity => {
        if(direction > 0) {
          if(located(entity, BEHIND, otherEntity)
            && touching(entity, RIGHT, otherEntity)
            && canClimb(entity, otherEntity)) {
              physics.deltaY += getClimbDistance(entity, otherEntity);
          }
        }
        else if(direction < 0) {
          if(located(entity, INFRONT, otherEntity)
            && touching(entity, LEFT, otherEntity)
            && canClimb(entity, otherEntity)) {
              physics.deltaY += getClimbDistance(entity, otherEntity);
          }
        }
      });
  }
}

function canClimb(entity, otherEntity) {
  return getClimbDistance(entity, otherEntity) < getClimbableDistance(entity);
}

function getClimbDistance(entity, otherEntity) {
  return otherEntity.top() - entity.bottom();
}

function getClimbableDistance(entity) {
  return entity.height() / 4;
}
