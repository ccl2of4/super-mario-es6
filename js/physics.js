var GRAVITY = 2,
    TERMINAL_VELOCITY_X = 20,
    TERMINAL_VELOCITY_Y = 50;

var ABOVE = 0; var TOP = 0;
var BELOW = 1; var BOTTOM = 1;
var BEHIND = 2; var RIGHT = 2;
var INFRONT = 3; var LEFT = 3;

export default class Physics {

  constructor() {
    this.deltaX = 0;
    this.deltaY = 0;
    this.grounded = false;
  }

  setEntity(entity) {
    this.entity = entity;
  }

  update(inputState, world) {
    var self = this;
    var entity = this.entity;
    var { direction, walking, running, jumping } = inputState;

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

    // deltaY
    self.deltaY -= GRAVITY;

    if (jumping && self.grounded) {
      this.deltaY += entity.jumpSpeed;
    }

    world.getEntities()
    .filter((otherEntity) => entity !== otherEntity)
    .forEach((otherEntity) => {
      if (located(entity, BELOW, otherEntity)) {
        self.deltaY = Math.min(self.deltaY, otherEntity.bottom() - entity.top());
      } else if (located(entity, ABOVE, otherEntity)) {
        self.deltaY = Math.max(self.deltaY, otherEntity.top() - entity.bottom());
      }
    });

    var sign = this.deltaY >= 0 ? 1 : -1;
    this.deltaY = sign * Math.min(TERMINAL_VELOCITY_Y, Math.abs(this.deltaY));
    entity.y(entity.bottom() + this.deltaY)





    var max_speed = entity.walkSpeed;
    if (running) {
      max_speed *= entity.runFactor;
    }

    if (walking) {
      var sign = this.deltaX >= 0 ? 1 : -1;
      if (Math.abs(this.deltaX) < max_speed || sign != direction) {
        this.deltaX += direction;
      }
    }

    if (!walking || Math.abs(this.deltaX) > max_speed) {
      var vel = Math.max(0, Math.abs(this.deltaX) - 1);
      sign = this.deltaX >= 0 ? 1 : -1;
      this.deltaX = vel * sign;
    }

    // deltaX
    world.getEntities()
    .filter((otherEntity) => otherEntity !== entity)
    .forEach((otherEntity) => {
        if(located(entity, BEHIND, otherEntity))
            this.deltaX = Math.min(this.deltaX, otherEntity.left() - entity.right());
        else if(located(entity, INFRONT, otherEntity))
            this.deltaX = Math.max(this.deltaX,otherEntity.right() - entity.left());
    });

    var sign = this.deltaX >= 0 ? 1 : -1;
    this.deltaX = sign * Math.min(TERMINAL_VELOCITY_X, Math.abs(this.deltaX));
    entity.x(entity.left() + this.deltaX);

    world.getEntities()
    .filter((otherEntity) => otherEntity !== entity)
    .forEach((otherEntity) => {
        if (intersect(entity, otherEntity)) {
          entity.x(entity.left() - this.deltaX);
          entity.y(entity.bottom() - this.deltaY);
          this.deltaX = 0;
          this.deltaY = 0;
        }
    });

  };
}

var intersect = function(entity1, entity2) {
  return !(entity1.left() > entity2.right() ||
           entity1.right() < entity2.left() ||
           entity1.top() > entity2.bottom() ||
           entity1.bottom() < entity2.top());
}

var located = function(entity1, WHERE, entity2) {
  switch (WHERE) {
    case BEHIND:
      return (entity1.right() <= entity2.left() && entity1.bottom() < entity2.top() && entity1.top() > entity2.bottom());
    case INFRONT:
      return (entity1.left() >= entity2.right() && entity1.bottom() < entity2.top() && entity1.top() > entity2.bottom());
    case ABOVE:
      return (entity1.bottom() >= entity2.top() && entity1.right() > entity2.left() && entity1.left() < entity2.right());
    case BELOW:
      return (entity1.top() <= entity2.bottom() && entity1.right() > entity2.left() && entity1.left() < entity2.right());
  }
};

var touching = function(entity1, WHERE, entity2) {
  switch (WHERE) {
    case RIGHT:
      return (entity1.right() >= entity2.left() && (entity1.bottom() <= entity2.top() && entity1.top() >= entity2.bottom()));
    case LEFT:
      return (entity1.left() <= entity2.right() && (entity1.bottom() <= entity2.top() && entity1.top() >= entity2.bottom()));
    case TOP:
      return (entity1.top() >= entity2.bottom() && (entity1.right() >= entity2.left() && entity1.left() <= entity2.right()));
    case BOTTOM:
      return (entity1.bottom() <= entity2.top() && (entity1.right() >= entity2.left() && entity1.left() <= entity2.right()));
    default:
      return (entity1.bottom() <= entity2.top() && entity1.top() >= entity2.bottom() && entity1.right() >= entity2.left() && entity1.left <= entity2.right());
    }
};
