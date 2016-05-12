var WORLDHEIGHT = 500;

export default class View {

    constructor(entity) {
      this.entity = entity;
    }

    update() {
        window.scrollTo(
            this.entity.x() - window.innerWidth/2,
            (WORLDHEIGHT - this.entity.y()) - window.innerHeight/2);
    }
}
