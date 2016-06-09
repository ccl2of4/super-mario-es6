import World from './world'
import UserInput from './userinput'
import AIController from './ai-controller'
import EntityFactory from './entityfactory'

var world = new World(document.body);

var mario = EntityFactory.createMario();
mario.setController(new UserInput());
mario.x(100);
mario.y(300);
world.addEntity(mario);
world.follow(mario);

let ground = EntityFactory.createPlatform(50000, 20);
world.addEntity(ground);
ground.x(0);
ground.y(0)

for(let i = 0; i < 20; ++i) {
  let platform = EntityFactory.createPlatform(100, 20);
  platform.x(1000 + (i % 2 == 0 ? 200 : 0));
  platform.y(i * 100);
  world.addEntity(platform);
}

for(let i = 0; i < 50; ++i) {
  let step = EntityFactory.createPlatform(100, 10);
  step.x(1500 + (i * 50));
  step.y(10 + (i * 10));
  world.addEntity(step);
}

for (let i = 0; i < 10; ++i) {
  let cpumario = EntityFactory.createMario({walkSpeed:3, runFactor:1.5, jumpSpeed:20});
  cpumario.setController(new AIController(mario));
  cpumario.x(i * 50)
  cpumario.y(150);
  world.addEntity(cpumario);
}

world.start();
