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
      this.hitRadius = 16;
      this.type = 0;
      this.nwX = this.x - 20;
      this.nwY = this.y + 12;
      this.swX = this.x - 20;
      this.swY = this.y - 12;
      this.neX = this.x + 20;
      this.neY = this.y + 12;
      this.seX = this.x + 20;
      this.seY = this.y - 12;

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

      this.gun = new Gun(this.x, this.y);

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

    update(game) {
      const {keyboard, mouse} = game;
      const {width, height} = game;

      if (keyboard.isPressed('a')) {
        this.vx -= this.speed;
      }

      if (keyboard.isPressed('d')) {
        this.vx += this.speed;
      }

      if (keyboard.isPressed('w')) {
        this.vy -= this.speed;
      }

      if (keyboard.isPressed('s')) {
        this.vy += this.speed;
      }

      const radian = Math.atan2(mouse.y - (height/2), mouse.x - (width/2));
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

      // update gun  
      this.gun.update(game, this.radian, this.x, this.y);

      // apply friction
      this.vx *= this.friction;
      this.vy *= this.friction;

      // reset colliding
      this.colliding = false;

      // update hitbox
      // NEED TO FIX THIS NOWWW
      this.nwX = rotatePoint(this.x, this.y, this.radian, this.x - 20, this.y - 20).x;
      this.nwY = rotatePoint(this.x, this.y, this.radian, this.x - 20, this.y - 20).y;
      this.swX = rotatePoint(this.x, this.y, this.radian, this.x - 20, this.y + 20).x;
      this.swY = rotatePoint(this.x, this.y, this.radian, this.x - 20, this.y + 20).y;
      this.neX = rotatePoint(this.x, this.y, this.radian, this.x + 20, this.y - 20).x;
      this.neY = rotatePoint(this.x, this.y, this.radian, this.x + 20, this.y - 20).y;
      this.seX = rotatePoint(this.x, this.y, this.radian, this.x + 20, this.y + 20).x;
      this.seY = rotatePoint(this.x, this.y, this.radian, this.x + 20, this.y + 20).y;
  }

    draw(game) {

      this.gun.draw(game);
      
      if(this.dead) {
        game.context.fillStyle = 'red';
        game.context.beginPath();
        game.context.arc(this.x, this.y, this.radius*1.2, 0, 2*Math.PI);
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
     
      //DEBUG
      //centerpoint
      // game.context.fillStyle = 'yellow';
      // game.context.beginPath();
      // game.context.arc(this.x,this.y,5,0,2*Math.PI);
      // game.context.fill();

      //hitbox
      game.context.beginPath();
      game.context.arc(this.x,this.y,this.hitRadius,0,2*Math.PI);
      game.context.strokeStyle = 'blue';
      game.context.stroke();

    }
  }
