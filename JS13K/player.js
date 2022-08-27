import {rotatePoint} from './util.js';


export default class Player {

    constructor( x = 0, y = 0) {

    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 12;
    this.radian = Math.PI*2*Math.random();
    this.speed = 0.5;
    this.colliding = false;
    this.death = false;
    this.health = 100;
    this.ammo = 0;

    }


    resolveCollision(obj) {}

    update(game) {

      const { keyboard, mouse} = game;

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
      if(keyboard.isPressed('s')){
        this.vy += this.speed;
      }
      this.radian = Math.atan2(this.vy, this.vx);

    }

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

    update(game){}

    draw(game) {
      
      if(this.dead) {
        game.context.fillStyle = 'red';
        game.context.beginPath();
        game.context.arc( this.x, this.y, this.radius*1.2, 0, 2*Math.PI );
        game.context.fill();
        return;
      }
  
      // draw shadow
      game.context.fillStyle = 'rgba(0,0,0,0.2)';
      game.context.beginPath();
      game.context.arc( this.x, this.y, this.radius*1.2, 0, 2*Math.PI );
      game.context.fill();
  
      // draw basket
      game.context.fillStyle = '#CC8D56';
      game.context.beginPath();
      const p0 = rotatePoint(this.x, this.y, this.radian, this.x, this.y + this.radius);
      game.context.arc( p0.x, p0.y, this.radius*0.5, 0, 2*Math.PI );
      game.context.fill();
  
      // draw circle
      game.context.fillStyle = this.hoodcolor;
      game.context.beginPath();
      game.context.arc( this.x, this.y, this.radius, 0, 2*Math.PI );
      game.context.fill();
  
      // draw hood
      game.context.beginPath();
      const p1 = rotatePoint(this.x, this.y, this.radian, this.x, this.y - this.radius);
      game.context.moveTo( p1.x, p1.y );
      const p2 = rotatePoint(this.x, this.y, this.radian, this.x - this.radius*2.5, this.y + Math.sin(game.frame/15)*5);
      const b1 = rotatePoint(this.x, this.y, this.radian, this.x - this.radius, this.y - this.radius);
      const b2 = rotatePoint(this.x, this.y, this.radian, this.x - this.radius, this.y - this.radius*0.5 + Math.cos(game.frame/15)*5);
      game.context.bezierCurveTo(b1.x, b1.y, b2.x, b2.y, p2.x, p2.y);
      const p3 = rotatePoint(this.x, this.y, this.radian, this.x, this.y + this.radius);
      const b3 = rotatePoint(this.x, this.y, this.radian, this.x - this.radius, this.y + this.radius*0.5 + Math.cos(game.frame/15)*5);
      const b4 = rotatePoint(this.x, this.y, this.radian, this.x - this.radius, this.y + this.radius);
      game.context.bezierCurveTo(b3.x, b3.y, b4.x, b4.y, p3.x, p3.y);
      game.context.fill();
  
      // draw face
      game.context.fillStyle = this.facecolor;
      game.context.beginPath();
      const p4 = rotatePoint(this.x, this.y, this.radian, this.x + this.radius*0.2, this.y);
      game.context.arc( p4.x, p4.y, this.radius*0.8, this.radian - 1.5, this.radian + 1.5 );
      game.context.fill();
  
      // draw nose
      const nose = rotatePoint(this.x, this.y, this.radian, this.x + this.radius, this.y);
      game.context.beginPath();
      game.context.arc( nose.x, nose.y, this.radius * 0.15, 0, 2*Math.PI );
      game.context.fill();
  
      // draw left eye
      game.context.fillStyle = '#000';
      const left = rotatePoint(this.x, this.y, this.radian, this.x + this.radius * 0.7, this.y - this.radius * 0.3);
      game.context.beginPath();
      game.context.arc( left.x, left.y, this.radius * 0.06, 0, 2*Math.PI );
      game.context.fill();
  
      // draw right eye
      const right = rotatePoint(this.x, this.y, this.radian, this.x + this.radius * 0.7, this.y + this.radius * 0.3);
      game.context.beginPath();
      game.context.arc(right.x, right.y, this.radius * 0.06, 0, 2*Math.PI );
      game.context.fill();
    }
}