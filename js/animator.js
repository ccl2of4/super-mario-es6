export class Animator {
  constructor(images) {
    this.images = images;

    this.duration = 0;
    this.direction = 'right';
    this.walking = false;
    this.running = false;
    this.jumping = false;
  }

  setEntity(entity) {
    this.entity = entity;
  }

  update(state) {
    if (!this.entity) {
      throw 'Animator must be associated with an entity before calling update.';
    }

    let { direction, walking, running, jumping } = state;
    let imageSet = null;

    if (direction) {
      this.direction = direction < 0 ? 'left' : 'right';
    }

    if (jumping) {
      imageSet = this.images.jump;
    }

    else if (running) {
      if(!this.running) this.duration = 0;

      if(this.duration < 10)
        imageSet = this.images.run;
      else
        imageSet = this.images.walk;

      this.duration = (this.duration < 20 ? this.duration + 1 : 0);
    }

    else if (walking) {
      if(!this.walking) this.duration = 0;

      if(this.duration < 20)
        imageSet = this.images.walk;
      else
        imageSet = this.images.stand;

        this.duration = (this.duration < 40 ? this.duration + 1 : 0);
    }

    else {
      imageSet = this.images.stand;
    }

    this.jumping = jumping;
    this.running = running;
    this.walking = walking;

    let image = imageSet[this.direction];
    this.entity.image(image);
  }

}

export class StaticAnimator {
  constructor(image) {
    this.image = image;
  }

  setEntity(entity) {
    this.entity = entity;
  }

  update(state) {
    if (!this.entity) {
      throw 'Animator must be associated with an entity before calling update.';
    }

    this.entity.image(this.image);
  }
}
