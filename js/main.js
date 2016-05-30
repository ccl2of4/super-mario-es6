import World from './world'
import Entity from './entity'
import {Animator, StaticAnimator} from './animator'
import UserInput from './userinput'
import AIController from './ai-controller'
import Physics from './physics'
import View from './view'

var world = new World(document.body);

var marioImages = {
  stand: {
    left: "../images/mariostand.png",
    right: "../images/mariostand1.png"
  },
  walk: {
    left: "../images/mariowalk.png",
    right: "../images/mariowalk1.png",
  },
  run: {
    left: "../images/mariorun.png",
    right: "../images/mariorun1.png",
  },
  jump: {
    left: "../images/mariojump.png",
    right: "../images/mariojump1.png"
  }
};

var groundImage = '../images/ground.png';

var mario = new Entity(46, 80);
mario.setAnimator(new Animator(marioImages));
mario.setController(new UserInput());
mario.setPhysics(new Physics());
world.addEntity(mario);
mario.walkSpeed = 5;
mario.jumpSpeed = 25;
mario.x(100);
mario.y(300);

var ground = new Entity(50000, 20);
ground.setAnimator(new StaticAnimator(groundImage));
world.addEntity(ground);
ground.x(0);
ground.y(0)

for(let i = 0; i < 20; ++i) {
  let platform = new Entity(100, 20);
  platform.setAnimator(new StaticAnimator(groundImage));
  platform.x(1000 + (i % 2 == 0 ? 200 : 0));
  platform.y(i * 100);
  world.addEntity(platform);
}

for(let i = 0; i < 50; ++i) {
  let step = new Entity(100, 10);
  step.setAnimator(new StaticAnimator(groundImage));
  step.x(1500 + (i * 50));
  step.y(10 + (i * 10));
  world.addEntity(step);
}

for (let i = 0; i < 10; ++i) {
  let cpumario = new Entity(46, 80);
  cpumario.setAnimator(new Animator(marioImages));
  cpumario.setController(new AIController(mario));
  cpumario.setPhysics(new Physics());
  world.addEntity(cpumario);
  cpumario.x(i * 50)
  cpumario.y(150);
}

var view = new View(mario);

function gameLoop() {
  world.update();
  view.update();
}

var _ = setInterval(gameLoop, 1000/60);
