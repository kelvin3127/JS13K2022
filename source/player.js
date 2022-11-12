import Gun from './gun.js';
import Flashlight from './flashlight.js';
import {rotatePoint} from './util.js';

export default class Player {

    constructor( x, y ) {
      //Player data
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.speed = 0.3;
      this.radius = 5.5;
      this.radian = 0      
      this.death = false;
      this.friction = 0.9;
      this.health = 7;
      this.maxHealth = 7;

      this.playerState = [
        "active",
        "static", 
        "damaged",
        "dead"
      ];

    this.currState = "static"

      //Weapon data
      this.ammo = 0;
      this.bulletClip = [];
      this.shooting = false;
      this.reload = false;
      this.gun = new Gun(this.x, this.y);
      this.flashlight = new Flashlight(this.x, this.y);

      //Hitbox data
      this.colliding = false;
      this.hitRadius = 16 ;
      this.type = 0;
      this.nwX = this.x - 20;
      this.nwY = this.y + 12;
      this.swX = this.x - 20;
      this.swY = this.y - 12;
      this.neX = this.x + 20;
      this.neY = this.y + 12;
      this.seX = this.x + 20;
      this.seY = this.y - 12;


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

    update(game) {
      const {keyboard, mouse} = game;
      const {width, height} = game;
      


      if (keyboard.isPressed('a')) {
        this.vx -= this.speed;
        //this.currState = "active";
      }

      if (keyboard.isPressed('d')) {
        this.vx += this.speed;
        //this.currState = "active";
      }

      if (keyboard.isPressed('w')) {
        this.vy -= this.speed;
        //this.currState = "active";
      }

      if (keyboard.isPressed('s')) {
        this.vy += this.speed;
        //this.currState = "active";
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

      // update flashlight
      this.flashlight.update(game, this.radian, this.x, this.y);

      // apply friction
      this.vx *= this.friction;
      this.vy *= this.friction;

      // reset colliding
      this.colliding = false;

      // update hitbox
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
      this.flashlight.draw(game);
      this.gun.draw(game);
       
      if(this.dead) {
        game.context.fillStyle = 'red';
        game.context.beginPath();
        game.context.arc(this.x, this.y, this.radius*1.2, 0, 2*Math.PI);
        game.context.fill();
        return;
      }
      if (this.currState === "static") {
      // Right Arm
      {
      game.context.fillStyle = '#C02942';
      game.context.beginPath(); 
      const ra1 = rotatePoint(this.x, this.y, this.radian, this.x, this.y + 14)
      game.context.moveTo(ra1.x, ra1.y);
      const ra2 = rotatePoint(this.x, this.y, this.radian, this.x + 10, this.y + 12)
      const ra3 = rotatePoint(this.x, this.y, this.radian, this.x + 13, this.y + 2)
      const ra4 = rotatePoint(this.x, this.y, this.radian, this.x + 15, this.y - 4)
      game.context.bezierCurveTo( ra2.x, ra2.y, ra3.x, ra3.y, ra4.x, ra4.y);
      game.context.lineTo(ra4.x, ra4.y);
      const ra5 = rotatePoint(this.x, this.y, this.radian, this.x + 13, this.y -7)
      const ra6 = rotatePoint(this.x, this.y, this.radian, this.x + 11, this.y - 5)
      game.context.quadraticCurveTo(ra5.x, ra5.y, ra6.x, ra6.y);
      game.context.lineTo( ra6.x, ra6.y)
      const ra7 = rotatePoint(this.x, this.y, this.radian, this.x + 4, this.y + 13)
      const ra8 = rotatePoint(this.x, this.y, this.radian, this.x + 1, this.y + 3)
      const ra9 = rotatePoint(this.x, this.y, this.radian, this.x + 0, this.y + 9)
      game.context.bezierCurveTo( ra7.x, ra7.y, ra8.x, ra8.y, ra9.x, ra9.y);
      game.context.lineTo(ra1.x, ra1.y);
      game.context.fill();
      }
      //Right Hand
      {
      game.context.fillStyle = '#F1D4AF';
      game.context.beginPath();
      const rh = rotatePoint(this.x, this.y , this.radian, this.x + 12, this.y - 3);
      game.context.arc( rh.x , rh.y, 2.5, 0, 2*Math.PI );
      game.context.fill()
      }
      //Left Arm
      {
      game.context.fillStyle = '#C02942';
      game.context.beginPath(); 
      const la1 = rotatePoint(this.x, this.y, this.radian, this.x , this.y - 14)
      game.context.moveTo(la1.x, la1.y);
      const la2 = rotatePoint(this.x, this.y, this.radian, this.x + 4, this.y - 12)
      const la3 = rotatePoint(this.x, this.y, this.radian, this.x + 15, this.y - 5)
      const la4 = rotatePoint(this.x, this.y, this.radian, this.x + 16, this.y + 5)
      game.context.bezierCurveTo( la2.x, la2.y, la3.x, la3.y, la4.x, la4.y);
      game.context.lineTo(la4.x, la4.y);
      const la5 = rotatePoint(this.x, this.y, this.radian, this.x + 15, this.y + 5)
      const la6 = rotatePoint(this.x, this.y, this.radian, this.x + 14, this.y + 6)
      game.context.quadraticCurveTo(la5.x, la5.y, la6.x, la6.y);
      game.context.moveTo( la6.x, la6.y)
      const la7 = rotatePoint(this.x, this.y, this.radian, this.x + 1, this.y - 13)
      const la8 = rotatePoint(this.x, this.y, this.radian, this.x + 1, this.y - 3)
      const la9 = rotatePoint(this.x, this.y, this.radian, this.x , this.y - 9)
      game.context.bezierCurveTo( la7.x, la7.y, la8.x, la8.y, la9.x, la9.y);
      game.context.lineTo(la1.x, la1.y);
      game.context.fill();
      }
      //Left Hand
      {
      game.context.fillStyle = '#F1D4AF';
      game.context.beginPath();
      const lh = rotatePoint(this.x, this.y , this.radian, this.x + 14, this.y + 4);
      game.context.arc( lh.x , lh.y, 2.5, 0, 2*Math.PI );
      game.context.fill() 
      }

      //Torso
      {
        game.context.strokeStyle = "#444444";
        game.context.beginPath();
        const t = rotatePoint( this.x, this.y, this.radian, this.x -7, this.y -12);
        game.context.moveTo(t.x, t.y)
        const t2 = rotatePoint( this.x, this.y, this.radian, this.x + this.y)
        game.context.lineTo(t.x + 4, t.y + 4)
        game.context.stroke();

      }
      //Left Torso
      {
      // game.context.fillStyle = '#7F9EA1';
      // game.context.beginPath();
      // const lt1 =  rotatePoint(this.x, this.y, this.radian, this.x + 2, this.y -3);
      // const lt2 = rotatePoint(this.x, this.y, this.radian, this.x + 3, this.y - 21);
      // const lt3 = rotatePoint(this.x, this.y, this.radian, this.x - 8, this.y - 21)
      // const lt4 = rotatePoint(this.x, this.y, this.radian, this.x - 10.5, this.y - 8)
      // game.context.moveTo(lt1.x, lt1.y)
      // game.context.bezierCurveTo( lt2.x, lt2.y, lt3.x, lt3.y, lt4.x, lt4.y)
      // game.context.fill();
      }
      //Right Torso
      {
      // game.context.fillStyle = '#7F9EA1';
      // game.context.beginPath();
      // const rt1 = rotatePoint(this.x, this.y, this.radian, this.x + 2, this.y + 3);
      // const rt2 = rotatePoint(this.x, this.y, this.radian, this.x + 3, this.y + 21);
      // const rt3 = rotatePoint(this.x, this.y, this.radian, this.x - 8, this.y + 21);
      // const rt4 = rotatePoint(this.x, this.y, this.radian, this.x - 10.5, this.y + 8);
      // game.context.moveTo(rt1.x, rt1.y)
      // game.context.bezierCurveTo( rt2.x, rt2.y, rt3.x, rt3.y, rt4.x, rt4.y)
      // game.context.fill();
      }
      //Draw Feet

      //Left Feet
      
      //Right Feet

      //Draw Head
      {
      game.context.fillStyle = '#4d2600';
      game.context.beginPath();
      const h1 = rotatePoint(this.x, this.y , this.radian, this.x - 3, this.y );
      game.context.arc( h1.x , h1.y, this.radius, 0, 2*Math.PI );
      game.context.fill();
      }
      //Draw Face
      {
      game.context.fillStyle = '#F1D4AF';
      game.context.beginPath();
      const p4 = rotatePoint(this.x, this.y, this.radian, this.x + - 3, this.y);
      game.context.arc( p4.x, p4.y, this.radius, this.radian - 1.5, this.radian + 1.5 );
      game.context.fill();
      }
      //Draw Eyes
      {
      game.context.fillStyle = '#000';
      const left = rotatePoint(this.x, this.y, this.radian, this.x , this.y - this.radius * 0.3);
      game.context.beginPath();
      game.context.arc( left.x, left.y, this.radius * 0.1, 0, 2*Math.PI );
      game.context.fill();

      game.context.fillStyle = '#000';
      const right = rotatePoint(this.x, this.y, this.radian, this.x , this.y + this.radius * 0.3);
      game.context.beginPath();
      game.context.arc(right.x, right.y, this.radius * 0.1, 0, 2*Math.PI );
      game.context.fill(); 
      }
      }

      if (this.playerState === "active") {

      }
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
