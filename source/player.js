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
      this.radius = 6;
      this.radian = 0;
      this.fovRadius = 7;  
      this.death = false;
      this.friction = 0.9;
      this.health = 7;
      this.maxHealth = 7;
      this.cellPos = {
        x:0,
        y:0
      }
      this.playerState = [
        "active",
        "static", 
        "damaged",
        "dead"
      ];
      this.currState = "static";

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

      //Animation data
      this.footMax = 4;
      this.footMin = -16;
      this.lfootChange = false;
      this.rfootChange = false;
      this.lfeetX = -6;
      this.rfeetX = -6;
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

    inView(object) {
      let xDiff = Math.abs(this.cellPos.x - object.cellPos.x);
      let yDiff = Math.abs(this.cellPos.y - object.cellPos.y);
      //console.log(object.id, object.cellPos.x);
      //console.log(object.cellPos.y, object.cellPos.y);
      return (xDiff + yDiff) <= this.fovRadius; 
  }

    update(game) {
      this.cellPos = {
        x: Math.floor(this.x / game.cellLength),
        y: Math.floor(this.y / game.cellLength)
      }
      const {keyboard, mouse} = game;
      const {width, height} = game;
      


      if (keyboard.isPressed('a')) {
        this.vx -= this.speed;
        this.currState = "active";
      }

      if (keyboard.isPressed('d')) {
        this.vx += this.speed;
        this.currState = "active";
      }

      if (keyboard.isPressed('w')) {
        this.vy -= this.speed;
        this.currState = "active";
      }

      if (keyboard.isPressed('s')) {
        this.vy += this.speed;
        this.currState = "active";
      } 

      if (!keyboard.isPressed('a') && !keyboard.isPressed('d')
           && !keyboard.isPressed('w') && !keyboard.isPressed('s')) {
            this.currState = "static";
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

      if  (this.currState === 'active') {
        if (this.lfootChange === false) {
          this.lfeetX += 0.5;
          
        }
        if (this.rfootChange === false) {
          this.rfeetX -= 0.5;
        }
        if (this.lfeetX === this.footMax) {
          this.lfootChange = true;
          
        }
        if (this.rfeetX === this.footMin){
          this.rfootChange = true;
        }
        if ( this.lfootChange === true) {
          this.lfeetX -= 0.5;
          
        }
        if (this.rfootChange === true) {
          this.rfeetX += 0.5;
        }
        if (this.lfeetX === this.footMin) {
          this.lfootChange = false;
          
        }
        if (this.rfeetX === this.footMax) {
          this.rfootChange = false;
        }

        } 
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
      //Torso
      {

        game.context.fillStyle = "black";
        game.context.beginPath();
        const t = rotatePoint( this.x, this.y, this.radian, this.x -9, this.y -12);
        game.context.moveTo(t.x, t.y)
        const t2 = rotatePoint( this.x, this.y, this.radian, this.x -16, this.y - 7)
        const t3 = rotatePoint( this.x, this.y, this.radian, this.x -18, this.y + 7)
        const t4 = rotatePoint( this.x, this.y, this.radian, this.x -9, this.y + 12)
        game.context.bezierCurveTo( t2.x, t2.y, t3.x, t3.y, t4.x, t4.y)
        const t5 = rotatePoint( this.x, this.y, this.radian, this.x -4, this.y + 12)
        const t6 = rotatePoint( this.x, this.y, this.radian, this.x -2, this.y + 8)
        const t7 = rotatePoint( this.x, this.y, this.radian, this.x -2, this.y + 2)
        game.context.bezierCurveTo( t5.x, t5.y, t6.x, t6.y, t7.x, t7.y)
        const t8 = rotatePoint( this.x, this.y, this.radian, this.x -2, this.y - 2)
        game.context.lineTo(t8.x, t8.y)
        const t9 = rotatePoint( this.x, this.y, this.radian, this.x -4, this.y - 8)
        const t10 = rotatePoint( this.x, this.y, this.radian, this.x -2, this.y - 12)
        game.context.bezierCurveTo( t9.x, t9.y, t10.x, t10.y, t.x, t.y)
        game.context.fill();

      }
      // Right Arm
      {
        game.context.fillStyle = '#3b7f8e';
        game.context.beginPath(); 
        const ra1 = rotatePoint(this.x, this.y, this.radian, this.x -9, this.y + 12)
        game.context.moveTo(ra1.x, ra1.y);
        const ra2 = rotatePoint(this.x, this.y, this.radian, this.x +5, this.y + 14)
        const ra3 = rotatePoint(this.x, this.y, this.radian, this.x +5, this.y + 4)
        const ra4 = rotatePoint(this.x, this.y, this.radian, this.x +5, this.y + 4)
        game.context.bezierCurveTo( ra2.x, ra2.y, ra3.x, ra3.y, ra4.x, ra4.y);
        const ra5 = rotatePoint(this.x, this.y, this.radian, this.x +1, this.y + 2)
        game.context.lineTo(ra5.x, ra5.y);   
        const ra6 = rotatePoint(this.x, this.y, this.radian, this.x -4, this.y + 7)
        game.context.lineTo(ra6.x, ra6.y);
        const ra7 = rotatePoint(this.x, this.y, this.radian, this.x -7, this.y + 7)
        const ra8 = rotatePoint(this.x, this.y, this.radian, this.x -8, this.y + 9)
        game.context.bezierCurveTo( ra7.x, ra7.y, ra8.x, ra8.y, ra1.x, ra1.y);
        game.context.fill();
      }
      //Right Hand
      {
      game.context.fillStyle = '#F1D4AF';
      game.context.beginPath();
      const rh = rotatePoint(this.x, this.y , this.radian, this.x + 3, this.y + 4);
      game.context.arc( rh.x , rh.y, 2, 0, 2*Math.PI );
      game.context.fill()
      }
      //Left Arm
      {
      game.context.fillStyle = '#3b7f8e';
      game.context.beginPath(); 
      const la1 = rotatePoint(this.x, this.y, this.radian, this.x -9, this.y - 12)
      game.context.moveTo(la1.x, la1.y);
      const la2 = rotatePoint(this.x, this.y, this.radian, this.x + 4, this.y - 15)
      const la3 = rotatePoint(this.x, this.y, this.radian, this.x + 13, this.y - 10)
      const la4 = rotatePoint(this.x, this.y, this.radian, this.x + 12, this.y - 2)
      game.context.bezierCurveTo( la2.x, la2.y, la3.x, la3.y, la4.x, la4.y);
      const la5 = rotatePoint(this.x, this.y, this.radian, this.x + 8, this.y -2)
      game.context.lineTo(la5.x, la5.y);
      const la6 = rotatePoint(this.x, this.y, this.radian, this.x + 10, this.y - 3)
      const la7 = rotatePoint(this.x, this.y, this.radian, this.x + 8, this.y - 6)
      const la8 = rotatePoint(this.x, this.y, this.radian, this.x - 4, this.y - 6)
      game.context.bezierCurveTo( la6.x, la6.y, la7.x, la7.y, la8.x, la8.y);
      const la9 = rotatePoint(this.x, this.y, this.radian, this.x -7, this.y - 7)
      const la10 = rotatePoint(this.x, this.y, this.radian, this.x -8, this.y - 9)
      game.context.bezierCurveTo( la9.x, la9.y, la10.x, la10.y, la1.x, la1.y);
      game.context.fill();
      }
      //Left Hand
      {
      game.context.fillStyle = '#F1D4AF';
      game.context.beginPath();
      const lh = rotatePoint(this.x, this.y , this.radian, this.x + 10, this.y - 2);
      game.context.arc( lh.x , lh.y, 2.5, 0, 2*Math.PI );
      game.context.fill() 
      }
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

      if (this.currState === "active") {
      
      //Draw Feet
      //Left Feet
      game.context.fillStyle = '#492e11';
      game.context.beginPath();
      const lf = rotatePoint(this.x, this.y, this.radian, this.x + this.lfeetX , this.y -5);
      game.context.arc( lf.x, lf.y, 3,0, 2*Math.PI);
      game.context.fill();
      //Right Feet
      game.context.fillStyle = '#492e11';
      game.context.beginPath();
      const rf = rotatePoint(this.x, this.y, this.radian, this.x + this.rfeetX, this.y +5);
      game.context.arc( rf.x, rf.y, 3,0, 2*Math.PI);
      game.context.fill();

      //Torso
      {
        game.context.fillStyle = "black";
        game.context.beginPath();
        const t = rotatePoint( this.x, this.y, this.radian, this.x -9, this.y -12);
        game.context.moveTo(t.x, t.y)
        const t2 = rotatePoint( this.x, this.y, this.radian, this.x -16, this.y - 7)
        const t3 = rotatePoint( this.x, this.y, this.radian, this.x -18, this.y + 7)
        const t4 = rotatePoint( this.x, this.y, this.radian, this.x -9, this.y + 12)
        game.context.bezierCurveTo( t2.x, t2.y, t3.x, t3.y, t4.x, t4.y)
        const t5 = rotatePoint( this.x, this.y, this.radian, this.x -4, this.y + 12)
        const t6 = rotatePoint( this.x, this.y, this.radian, this.x -2, this.y + 8)
        const t7 = rotatePoint( this.x, this.y, this.radian, this.x -2, this.y + 2)
        game.context.bezierCurveTo( t5.x, t5.y, t6.x, t6.y, t7.x, t7.y)
        const t8 = rotatePoint( this.x, this.y, this.radian, this.x -2, this.y - 2)
        game.context.lineTo(t8.x, t8.y)
        const t9 = rotatePoint( this.x, this.y, this.radian, this.x -4, this.y - 8)
        const t10 = rotatePoint( this.x, this.y, this.radian, this.x -2, this.y - 12)
        game.context.bezierCurveTo( t9.x, t9.y, t10.x, t10.y, t.x, t.y)
        game.context.fill();

      }

      // Right Arm
      {
        game.context.fillStyle = '#3b7f8e';
        game.context.beginPath(); 
        const ra1 = rotatePoint(this.x, this.y, this.radian, this.x -9, this.y + 12)
        game.context.moveTo(ra1.x, ra1.y);
        const ra2 = rotatePoint(this.x, this.y, this.radian, this.x +5, this.y + 14)
        const ra3 = rotatePoint(this.x, this.y, this.radian, this.x +5, this.y + 4)
        const ra4 = rotatePoint(this.x, this.y, this.radian, this.x +5, this.y + 4)
        game.context.bezierCurveTo( ra2.x, ra2.y, ra3.x, ra3.y, ra4.x, ra4.y);
        const ra5 = rotatePoint(this.x, this.y, this.radian, this.x +1, this.y + 2)
        game.context.lineTo(ra5.x, ra5.y);   
        const ra6 = rotatePoint(this.x, this.y, this.radian, this.x -4, this.y + 7)
        game.context.lineTo(ra6.x, ra6.y);
        const ra7 = rotatePoint(this.x, this.y, this.radian, this.x -7, this.y + 7)
        const ra8 = rotatePoint(this.x, this.y, this.radian, this.x -8, this.y + 9)
        game.context.bezierCurveTo( ra7.x, ra7.y, ra8.x, ra8.y, ra1.x, ra1.y);
        game.context.fill();
      }
      //Right Hand
      {
      game.context.fillStyle = '#F1D4AF';
      game.context.beginPath();
      const rh = rotatePoint(this.x, this.y , this.radian, this.x + 3, this.y + 4);
      game.context.arc( rh.x , rh.y, 2, 0, 2*Math.PI );
      game.context.fill()
      }
      //Left Arm
      {
      game.context.fillStyle = '#3b7f8e';
      game.context.beginPath(); 
      const la1 = rotatePoint(this.x, this.y, this.radian, this.x -9, this.y - 12)
      game.context.moveTo(la1.x, la1.y);
      const la2 = rotatePoint(this.x, this.y, this.radian, this.x -3, this.y - 18)
      const la3 = rotatePoint(this.x, this.y, this.radian, this.x + 13, this.y - 10)
      const la4 = rotatePoint(this.x, this.y, this.radian, this.x + 12, this.y - 2)
      game.context.bezierCurveTo( la2.x, la2.y, la3.x, la3.y, la4.x, la4.y);
      const la5 = rotatePoint(this.x, this.y, this.radian, this.x + 8, this.y -2)
      game.context.lineTo(la5.x, la5.y);
      const la6 = rotatePoint(this.x, this.y, this.radian, this.x + 10, this.y - 3)
      const la7 = rotatePoint(this.x, this.y, this.radian, this.x + 6, this.y - 9)
      const la8 = rotatePoint(this.x, this.y, this.radian, this.x - 4, this.y - 6)
      game.context.bezierCurveTo( la6.x, la6.y, la7.x, la7.y, la8.x, la8.y);
      const la9 = rotatePoint(this.x, this.y, this.radian, this.x -7, this.y - 7)
      const la10 = rotatePoint(this.x, this.y, this.radian, this.x -8, this.y - 9)
      game.context.bezierCurveTo( la9.x, la9.y, la10.x, la10.y, la1.x, la1.y);
      game.context.fill();
      }
      //Left Hand
      {
      game.context.fillStyle = '#F1D4AF';
      game.context.beginPath();
      const lh = rotatePoint(this.x, this.y , this.radian, this.x + 10, this.y - 2);
      game.context.arc( lh.x , lh.y, 2.5, 0, 2*Math.PI );
      game.context.fill() 
      }

      
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
      //DEBUG
      //centerpoint
      // game.context.fillStyle = 'yellow';
      // game.context.beginPath();
      // game.context.arc(this.x,this.y,5,0,2*Math.PI);
      // game.context.fill();

      //hitbox
      // game.context.beginPath();
      // game.context.arc(this.x,this.y,this.hitRadius,0,2*Math.PI);
      // game.context.strokeStyle = 'blue';
      // game.context.stroke();

    
  }
}
