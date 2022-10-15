import Gun from './gun.js';
import {rotatePoint} from './util.js';

export default class Player {

    constructor( x, y ) {
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.radius = 11;
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

      //New Left Hand
      game.context.strokeStyle = ""

       //Right hand
       game.context.fillStyle = '#C02942';
       game.context.beginPath()
       const rh1 = rotatePoint(this.x, this.y, this.radian, this.x + 5, this.y+ 10);
       game.context.moveTo(rh1.x, rh1.y);
       const rh2 = rotatePoint(this.x, this.y, this.radian, this.x+17, this.y + 10);
       game.context.lineTo(rh2.x, rh2.y);
       const rh3= rotatePoint(this.x, this.y, this.radian, this.x+17, this.y + 16.5);
       game.context.lineTo(rh3.x, rh3.y);
       const rh4 = rotatePoint(this.x, this.y, this.radian, this.x + 5, this.y + 16.5);
       game.context.lineTo(rh4.x, rh4.y)
       game.context.fill(); 

      //  game.contect.fillStyle = '#3b3c36';
      //  game.context.beginPath();
      //  const rh5= rotatePoint(this.x, this.y, this.radian, this.x)


      //Left hand
      game.context.fillStyle = '#C02942';
      game.context.beginPath()
      const lh1 = rotatePoint(this.x, this.y, this.radian, this.x + 5, this.y-9);
      game.context.moveTo(lh1.x, lh1.y);
      const lh2 = rotatePoint(this.x, this.y, this.radian, this.x+14, this.y - 9);
      game.context.lineTo(lh2.x, lh2.y);
      const lh3 = rotatePoint(this.x, this.y, this.radian, this.x+14, this.y - 17);
      game.context.lineTo(lh3.x, lh3.y);
      const lh4 = rotatePoint(this.x, this.y, this.radian, this.x + 5, this.y -17);
      game.context.lineTo(lh4.x, lh4.y)
      game.context.fill(); 

      //Left hand
      game.context.fillStyle = '#C02942';
      game.context.beginPath()
      const lh5 = rotatePoint(this.x, this.y, this.radian, this.x + 15, this.y-9);
      game.context.moveTo(lh5.x, lh5.y);
      const lh6 = rotatePoint(this.x, this.y, this.radian, this.x+17, this.y - 9);
      game.context.lineTo(lh6.x, lh6.y);
      const lh7= rotatePoint(this.x, this.y, this.radian, this.x+17, this.y - 17);
      game.context.lineTo(lh7.x, lh7.y);
      const lh8 = rotatePoint(this.x, this.y, this.radian, this.x + 15, this.y -17);
      game.context.lineTo(lh8.x, lh8.y)
      game.context.fill(); 

      //Draw Torso
      
      //Left Torso
      // game.context.fillStyle = '#7F9EA1';
      // game.context.beginPath()
      // const lt1 = rotatePoint(this.x, this.y, this.radian, this.x - 10, this.y - 5);
      // game.context.moveTo(lt1.x, lt1.y);
      // const lt2 = rotatePoint(this.x, this.y, this.radian, this.x + 5, this.y - 5);
      // game.context.lineTo(lt2.x, lt2.y);
      // const lt3 = rotatePoint(this.x, this.y, this.radian, this.x + 5, this.y - 20);
      // game.context.lineTo(lt3.x, lt3.y);
      // const lt4 = rotatePoint(this.x, this.y, this.radian, this.x + - 10, this.y - 20);
      // game.context.lineTo(lt4.x, lt4.y)
      // game.context.fill(); 

      //Right Torso
      // game.context.fillStyle = '#7F9EA1';
      // game.context.beginPath()
      // const rt1 = rotatePoint(this.x, this.y, this.radian, this.x - 6, this.y + 5);
      // game.context.moveTo(rt1.x, rt1.y);
      // const rt2 = rotatePoint(this.x, this.y, this.radian, this.x + 8, this.y + 5);
      // game.context.lineTo(rt2.x, rt2.y);
      // const rt3 = rotatePoint(this.x, this.y, this.radian, this.x + 8, this.y + 20);
      // game.context.lineTo(rt3.x, rt3.y);
      // const rt4 = rotatePoint(this.x, this.y, this.radian, this.x + - 6, this.y + 20);
      // game.context.lineTo(rt4.x, rt4.y)
      // game.context.fill(); 

      //New Left Torso
      game.context.fillStyle = '#7F9EA1';
      game.context.beginPath();
      const lt1 = rotatePoint(this.x, this.y, this.radian, this.x + 5, this.y -3);
      const lt2 = rotatePoint(this.x, this.y, this.radian, this.x + 9, this.y - 25);
      const lt3 = rotatePoint(this.x, this.y, this.radian, this.x - 6, this.y - 25)
      const lt4 = rotatePoint(this.x, this.y, this.radian, this.x - 10, this.y - 8)
      game.context.moveTo(lt1.x, lt1.y)
      game.context.bezierCurveTo( lt2.x, lt2.y, lt3.x, lt3.y, lt4.x, lt4.y)
      game.context.fill();


      //New Right Torso
      game.context.fillStyle = '#7F9EA1';
      game.context.beginPath();
      const rt1 = rotatePoint(this.x, this.y, this.radian, this.x + 5, this.y + 3);
      const rt2 = rotatePoint(this.x, this.y, this.radian, this.x + 9, this.y + 25);
      const rt3 = rotatePoint(this.x, this.y, this.radian, this.x - 6, this.y + 25);
      const rt4 = rotatePoint(this.x, this.y, this.radian, this.x - 10, this.y + 8);
      game.context.moveTo(rt1.x, rt1.y)
      game.context.bezierCurveTo( rt2.x, rt2.y, rt3.x, rt3.y, rt4.x, rt4.y)
      game.context.fill();



      //Draw Feet

      //Left Feet

      //Right Feet


  
      //Draw Head
      game.context.fillStyle = '#4d2600';
      game.context.beginPath();
      const h1 = rotatePoint(this.x, this.y , this.radian, this.x - 3, this.y );
      game.context.arc( h1.x , h1.y, this.radius, 0, 2*Math.PI );
      game.context.fill();

      //Draw Face
      game.context.fillStyle = '#F1D4AF';
      game.context.beginPath();
      const p4 = rotatePoint(this.x, this.y, this.radian, this.x + - 3, this.y);
      game.context.arc( p4.x, p4.y, this.radius, this.radian - 1.5, this.radian + 1.5 );
      game.context.fill();

      //Draw Eyes
      game.context.fillStyle = '#000';
      const left = rotatePoint(this.x, this.y, this.radian, this.x + 2, this.y - this.radius * 0.3);
      game.context.beginPath();
      game.context.arc( left.x, left.y, this.radius * 0.1, 0, 2*Math.PI );
      game.context.fill();

      game.context.fillStyle = '#000';
      const right = rotatePoint(this.x, this.y, this.radian, this.x + 2, this.y + this.radius * 0.3);
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
