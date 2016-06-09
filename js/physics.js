const GRAVITY = 2,
    TERMINAL_VELOCITY_X = 20,
    TERMINAL_VELOCITY_Y = 50;

const ABOVE = 0, TOP = 0,
      BELOW = 1, BOTTOM = 1,
      BEHIND = 2, RIGHT = 2,
      INFRONT = 3, LEFT = 3;

export { GRAVITY, TERMINAL_VELOCITY_X, TERMINAL_VELOCITY_Y, ABOVE, TOP, BELOW, BOTTOM, BEHIND, RIGHT, INFRONT, LEFT };

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

    // Apply gravity
    self.deltaY -= GRAVITY;

    // deltaY
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

    // Check for intersections and attempt to correct them by
    // moving the entity in the opposite direction that it was just moving.
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

export function intersect(entity1, entity2) {
  return !(entity1.left() > entity2.right() ||
           entity1.right() < entity2.left() ||
           entity1.top() > entity2.bottom() ||
           entity1.bottom() < entity2.top());
}

export function located(entity1, WHERE, entity2) {
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

export function touching(entity1, WHERE, entity2) {
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
