import Gun from './gun.js';
import {rotatePoint} from './util.js';

export default class Player {

    constructor( x, y ) {
    
    
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = 12;

    //Hitbox data
    this.nwX = x;
    this.nwY = y;
    this.swX = x;
    this.swY = y;
    this.neX = x;
    this.neY = y;
    this.seX = x;
    this.seY = y; 

    this.radian = 0
    this.radianTest = 0;
    
    this.speed = 0.3;
    this.colliding = false;
    this.death = false;
    this.health = 100;
    this.ammo = 0;
    this.friction = 0.9;

    this.bulletClip = [];

    this.shooting = false;

    this.reload = false;
    
    this.bulletX = x;
    this.bulletY = y;

    this.gun = new Gun(x, y);

    }

    resolveCollision(obj) {}

    //pickup health or ammo
    onPickup(item) {
      if (item == "health" ) {
          this.health += 20;
      }
      else if (item == "ammo") {
          this.ammo += 10;
      }
    }

    //On hit Lose health
    onHit(health) {
      if ( health <= 0) {
          this.death = true;
          //chagne gamestate
      }
    }

    update(game){

      // get relevant variables
      const {keyboard, mouse} = game;
      const {width, height} = game;

      // check for left keys
      if (keyboard.isPressed('a')) {
        this.vx -= this.speed;
      }

      // check for right keys
      if (keyboard.isPressed('d')) {
        this.vx += this.speed;
      }

      // check for up keys
      if (keyboard.isPressed('w')) {
        this.vy -= this.speed;
      }

      // check for down keys
      if (keyboard.isPressed('s')) {
        this.vy += this.speed;
      }

      // calculate radian
      const radian = Math.atan2(mouse.y - (height/2), mouse.x - (width/2));

      // get change
      let diff = radian - this.radian;

      if(diff < -Math.PI){
        diff += Math.PI*2;
      } else if (diff > Math.PI) {
        diff -= Math.PI*2;
      }

      // apply rotation with lerp
      this.radian += diff * 1;

      // update position
      this.x += this.vx;
      this.y += this.vy;

      // update bullet position
      this.bulletX += 1;
      this.bulletY += 1;

      // update gun  
      this.gun.update(game, this.radian, this.x, this.y);

      // apply friction
      this.vx *= this.friction;
      this.vy *= this.friction;

      // reset colliding
      this.colliding = false;
  }

    draw(game) {

      this.gun.draw(game);
      
      if(this.dead) {
        game.context.fillStyle = 'red';
        game.context.beginPath();
        game.context.arc( this.x, this.y, this.radius*1.2, 0, 2*Math.PI );
        game.context.fill();
        return;
      }

      //Right hand
      game.context.fillStyle = '#C02942';
      game.context.beginPath();
      const a1 = rotatePoint(this.x, this.y, this.radian, this.x, this.y + 22);
      game.context.moveTo(a1.x, a1.y);
      const a2 = rotatePoint(this.x, this.y, this.radian, this.x+25, this.y - 8);
      game.context.lineTo(a2.x, a2.y);
      const a3 = rotatePoint(this.x, this.y, this.radian, this.x+22, this.y + 8);
      game.context.lineTo(a3.x, a3.y);
      const a4 = rotatePoint(this.x, this.y, this.radian, this.x, this.y + 20);
      game.context.lineTo(a4.x, a4.y)
      game.context.fill(); 

      // //Gun
      // game.context.fillStyle = '#929292';
      // game.context.beginPath()
      // const g1 = rotatePoint(this.x, this.y, this.radian, this.x+20, this.y);
      // game.context.moveTo(g1.x, g1.y);
      // const g2 = rotatePoint(this.x, this.y, this.radian, this.x+40, this.y - 2);
      // game.context.lineTo(g2.x, g2.y);
      // const g3 = rotatePoint(this.x, this.y, this.radian, this.x+40, this.y + 2);
      // game.context.lineTo(g3.x, g3.y);
      // const g4 = rotatePoint(this.x, this.y, this.radian, this.x+20, this.y + 2);
      // game.context.lineTo(g4.x, g4.y)
      // game.context.stroke();
      // game.context.fill();

      // game.context.fillStyle = '#929292';
      // game.context.beginPath()
      // const g5 = rotatePoint(this.x, this.y, this.radian, this.x+12, this.y -4);
      // game.context.moveTo(g5.x, g5.y);
      // const g6 = rotatePoint(this.x, this.y, this.radian, this.x+27.5, this.y - 4);
      // game.context.lineTo(g6.x, g6.y);
      // const g7 = rotatePoint(this.x, this.y, this.radian, this.x+27.5, this.y + 4);
      // game.context.lineTo(g7.x, g7.y);
      // const g8 = rotatePoint(this.x, this.y, this.radian, this.x+12, this.y + 4);
      // game.context.lineTo(g8.x, g8.y)
      // game.context.stroke();
      // game.context.fill(); 

      //Left hand
      game.context.fillStyle = '#C02942';
      game.context.beginPath()
      const a5 = rotatePoint(this.x, this.y, this.radian, this.x, this.y - 20);
      game.context.moveTo(a5.x, a5.y);
      const a6 = rotatePoint(this.x, this.y, this.radian, this.x+30, this.y - 3);
      game.context.lineTo(a6.x, a6.y);
      const a7 = rotatePoint(this.x, this.y, this.radian, this.x+27, this.y + 3);
      game.context.lineTo(a7.x, a7.y);
      const a8 = rotatePoint(this.x, this.y, this.radian, this.x, this.y -15);
      game.context.lineTo(a8.x, a8.y)
      game.context.fill(); 

      //Draw Torso
      game.context.fillStyle = '#7F9EA1';
      game.context.beginPath();
      const p0 = rotatePoint(this.x, this.y, this.radian, this.x, this.y + this.radius);
      game.context.arc( p0.x, p0.y, this.radius*0.7, 0, 2*Math.PI );
      game.context.fill();

      game.context.fillStyle = '#7F9EA1';
      game.context.beginPath();
      const p1 = rotatePoint(this.x, this.y, this.radian, this.x, this.y - this.radius);
      game.context.arc( p1.x, p1.y, this.radius*0.7, 0, 2*Math.PI );
      game.context.fill();
  
      //Draw Head
      game.context.fillStyle = '#4d2600';
      game.context.beginPath();
      game.context.arc( this.x, this.y, this.radius, 0, 2*Math.PI );
      game.context.fill();

      //Draw Face
      game.context.fillStyle = '#F1D4AF';
      game.context.beginPath();
      const p4 = rotatePoint(this.x, this.y, this.radian, this.x + this.radius*0.2, this.y);
      game.context.arc( p4.x, p4.y, this.radius, this.radian - 1.5, this.radian + 1.5 );
      game.context.fill();

      //Draw Eyes
      game.context.fillStyle = '#000';
      const left = rotatePoint(this.x, this.y, this.radian, this.x + this.radius * 0.8, this.y - this.radius * 0.3);
      game.context.beginPath();
      game.context.arc( left.x, left.y, this.radius * 0.1, 0, 2*Math.PI );
      game.context.fill();

      game.context.fillStyle = '#000';
      const right = rotatePoint(this.x, this.y, this.radian, this.x + this.radius * 0.8, this.y + this.radius * 0.3);
      game.context.beginPath();
      game.context.arc(right.x, right.y, this.radius * 0.1, 0, 2*Math.PI );
      game.context.fill();
      
    }
  }
