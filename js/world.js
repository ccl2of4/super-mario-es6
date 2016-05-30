export default class World {

  constructor(mountNode) {
    this.mountNode = mountNode;
    this.entities = [];
  }

  addEntity(entity) {
    this.mountNode.appendChild(entity.node);
    this.entities.push(entity);
  }

  getEntities() {
    return this.entities;
  }

  update() {
    var self = this;
    this.entities.forEach((entity) => {
      entity.update(self);
    });
  }

}
