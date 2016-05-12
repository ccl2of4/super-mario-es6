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

var ground2 = new Entity(20, 150);
ground2.setAnimator(new StaticAnimator(groundImage));
world.addEntity(ground2);
ground2.x(2000);
ground2.y(0)

var nums = [50, 100, 150, 200, 250, 300, 350, 400];
nums.forEach((x) => {
  let cpumario = new Entity(46, 80);
  cpumario.setAnimator(new Animator(marioImages));
  cpumario.setController(new AIController(mario));
  cpumario.setPhysics(new Physics());
  world.addEntity(cpumario);
  cpumario.x(x)
  cpumario.y(150);
});


var view = new View(mario);

function gameLoop() {
  world.update();
  view.update();
}

var _ = setInterval(gameLoop, 1000/60);
