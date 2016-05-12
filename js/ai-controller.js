export default class AIController {
  constructor(targetEntity) {
    this.targetEntity = targetEntity;
  }

  setEntity(entity) {
    this.entity = entity;
    var self = this;
    var _ = setInterval(function() { self.update(); }, 1000/3);
  }

  getState() {
    return {
      direction:  this.direction,
      walking:    this.walking,
      running:    this.running,
      jumping:    this.jumping
    };
  }

  update() {
    let deltaX = this.targetEntity.left() - this.entity.left();

    if(this.entity.top() < this.targetEntity.top()
      && Math.abs(this.entity.left() - this.targetEntity.left()) < 100) {
        this.jumping = true;
      } else {
        this.jumping = false;
      }

    this.direction = deltaX < 0 ? -1 : 1;
    this.walking = deltaX != 0;
    this.running = this.walking && Math.abs(deltaX < 300);
  }
}
