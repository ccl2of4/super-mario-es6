import Entity from './entity'
import Physics from './physics'
import Jumping from './jumping'
import Walking from './walking'
import { Animator, StaticAnimator } from './animator'

export default class EntityFactory {

  static createMario(options = {}) {
    let walkSpeed = options.walkSpeed || 5,
        runFactor = options.runFactor || 2,
        jumpSpeed = options.jumpSpeed || 30;

    let marioImages = {
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

    let mario = new Entity(46, 80);
    mario.addBehavior(new Animator(marioImages));
    mario.addBehavior(new Physics());
    mario.addBehavior(new Walking(walkSpeed, runFactor));
    mario.addBehavior(new Jumping(jumpSpeed));
    return mario;
  }

  static createPlatform(width, height) {
    let groundImage = '../assets/ground.png';
    let ground = new Entity(width, height);
    ground.addBehavior(new StaticAnimator(groundImage));
    return ground;
  }

}
