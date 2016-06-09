import View from './view'

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

  follow(entity) {
    this.view = new View(entity);
  }

  start() {
    this.setBackground();
    this.playTheme();

    var self = this;
    setInterval(function() {
      self.update();
    }, 1000/60);
  }

  update() {
    var self = this;
    this.entities.forEach((entity) => {
      entity.update(self);
    });
    this.view.update();
  }

  setBackground() {
    var background = "../assets/background.gif";
    document.body.style.backgroundImage = `url("${background}")`
  }

  playTheme() {
    this.theme = new Audio('../assets/theme.mp3');
    //this.theme.play();
  }

}
