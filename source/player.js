import Bullet from './bullet.js';
import {rotatePoint} from './util.js';

export default class Player {

    constructor( x, y ) {

    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = 12;

    this.radian = 0
    this.radianTest = 0;
    
    this.speed = 0.5;
    this.colliding = false;
    this.death = false;
    this.health = 100;
    this.ammo = 0;
    this.friction = 0.9;

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
      //const radian = Math.atan2(this.vy, this.vx);

      //console.log("keyborad:" + radian * 180/Math.PI, "mouse:" +radianTest * 180/Math.PI);
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

      if (mouse.pressed) {
        const bullet = new Bullet(this.x, this.y, this.radian)
      }

      //console.log(this.radian * 180/Math.PI);

/*       if(Math.abs(Math.sqrt(this.vx*this.vx + this.vy*this.vy)) > 1){
        this.history.unshift([this.x, this.y]);
        if(this.history.length > 1000){
          this.history.pop();
        }
      } */
/* 
      if(game.frame % 10 === 0 && (Math.round(this.vx) !== 0 || Math.round(this.vy) !== 0)){

        // add footstep
        const step = new Step(this.x,this.y);
        game.steps.unshift(step);

      } */

      // apply friction
      this.vx *= this.friction;
      this.vy *= this.friction;

      // reset colliding
      this.colliding = false;

      // test collision with sisters
/*       game.sisters.forEach((sister, i) => {
        if(distanceBetween(this, sister) < 0){
          sister.found = true;
          this.sisters.unshift(sister);
          game.sisters.splice(i, 1);

        }
      }); */

/*       this.sisters.forEach((sister, i)=> {
        if (sister.dead){
          return;
        }

        const dx = (this.history[i*15 + 15][0] - sister.x) * 0.1;
        const dy = (this.history[i*15 + 15][1] - sister.y) * 0.1;
        sister.radian = Math.atan2(dy, dx);
        sister.x += dx;
        sister.y += dy;
      }); */
    }

    draw(game) {
      
      if(this.dead) {
        game.context.fillStyle = 'red';
        game.context.beginPath();
        game.context.arc( this.x, this.y, this.radius*1.2, 0, 2*Math.PI );
        game.context.fill();
        return;
      }

      //This is the line pointing to mouse/player


 /*      //Left hand
      game.context.fillStyle = '#C02942';
      game.context.beginPath()
      const p3 = rotatePoint(this.x, this.y, this.radian, this.x + this.radius*0.2, this.y);
      game.context.rect(p3.x - 20, p3.y -40, 8, 40);
      game.context.fill();
      
      //Right hand
      game.context.fillStyle = '#C02942';
      game.context.beginPath()
      game.context.rect(p3.x + 13, p3.y - 40, 8, 40);
      game.context.fill();

      //Gun
      game.context.fillStyle = '#929292';
      game.context.beginPath()
      const p4 = rotatePoint(this.x, this.y, this.radian, this.x + this.radius*0.2, this.y);
      game.context.rect(p4.x - 5, p4.y - 55, 10, 30);
      game.context.fill();
    
      game.context.fillStyle = '#929292';
      game.context.beginPath()
      game.context.rect(p4.x - 2.75, p4.y - 65, 5, 10);
      game.context.fill(); */

/*       //Torso
      game.context.fillStyle = '#7F9EA1';
      game.context.beginPath()
      const p2 = rotatePoint(this.x, this.y, this.radian, this.x + this.radius*0.2, this.y);
      console.log(p2.x - 25, p2.y - 10);
      game.context.rect(p2.x - 25, p2.y- 10, 50, 20);
      game.context.fill();

      //Head
      game.context.fillStyle = '#F1D4AF';
      game.context.beginPath();
      const p0 = rotatePoint(this.x, this.y, this.radian, this.x + this.radius*0.2, this.y);
      game.context.arc( p0.x, p0.y + 5, 20, this.radian - 1.5, this.radian + 1.5);
      game.context.fill();

      //Hair
      game.context.fillStyle = '#4d2600';
      game.context.beginPath();
      const p1 = rotatePoint(this.x, this.y, this.radian, this.x + this.radius*0.2, this.y);
      game.context.arc( p1.x, p1.y + 5, 15, this.radian - 1.5, this.radian + 1.5);
      game.context.fill();

    }
} */

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