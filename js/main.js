import World from './world'
import Entity from './entity'
import {Animator, StaticAnimator} from './animator'
import UserInput from './userinput'
import AIController from './ai-controller'
import Physics from './physics'

var world = new World(document.body);

var marioImages = {
  stand: {
    left: "../assets/mariostand.png",
    right: "../assets/mariostand1.png"
  },
  walk: {
    left: "../assets/mariowalk.png",
    right: "../assets/mariowalk1.png",
  },
  run: {
    left: "../assets/mariorun.png",
    right: "../assets/mariorun1.png",
  },
  jump: {
    left: "../assets/mariojump.png",
    right: "../assets/mariojump1.png"
  }
};

var groundImage = '../assets/ground.png';

var mario = new Entity(46, 80);
mario.setController(new UserInput());
mario.addBehavior(new Animator(marioImages));
mario.addBehavior(new Physics());
mario.walkSpeed = 5;
mario.jumpSpeed = 25;
mario.x(100);
mario.y(300);

world.addEntity(mario);
world.follow(mario);

var ground = new Entity(50000, 20);
ground.addBehavior(new StaticAnimator(groundImage));
world.addEntity(ground);
ground.x(0);
ground.y(0)

for(let i = 0; i < 20; ++i) {
  let platform = new Entity(100, 20);
  platform.addBehavior(new StaticAnimator(groundImage));
  platform.x(1000 + (i % 2 == 0 ? 200 : 0));
  platform.y(i * 100);
  world.addEntity(platform);
}

for(let i = 0; i < 50; ++i) {
  let step = new Entity(100, 10);
  step.addBehavior(new StaticAnimator(groundImage));
  step.x(1500 + (i * 50));
  step.y(10 + (i * 10));
  world.addEntity(step);
}

for (let i = 0; i < 10; ++i) {
  let cpumario = new Entity(46, 80);
  cpumario.addBehavior(new Animator(marioImages));
  cpumario.addBehavior(new Physics());
  cpumario.setController(new AIController(mario));
  world.addEntity(cpumario);
  cpumario.x(i * 50)
  cpumario.y(150);
}

world.start();
