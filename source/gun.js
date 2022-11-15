import Projectile from './projectile.js';
import {rotatePoint} from './util.js';

export default class Gun {
    constructor(x,y) {
        //Gun data
        this.x = x;
        this.y = y;
        this.radian = 0
        this.recoil = 0;
        this.fireRate = 50;
        this.damage = 1;

        //Hitbox data
        this.nwX = x;
        this.nwY = y;
        this.swX = x;
        this.swY = y;
        this.neX = x;
        this.neY = y;
        this.seX = x;
        this.seY = y;

        this.gunnwX = x;
        this.gunnwY = y;
        this.gunswX = x;
        this.gunswY = y;
        this.gunneX = x;
        this.gunneY = y;
        this.gunseX = x;
        this.gunseY = y;

        this.g1 = {};
        this.g2 = {};
        this.g3 = {};
        this.g4 = {};
        this.g5 = {};
        this.g6 = {};
        this.g7 = {};
        this.g8 = {};
    }
    update(game, radian, x,y) {
        this.radian = radian;
        this.x = x;
        this.y = y;
        this.g1 = rotatePoint(this.x, this.y, this.radian, this.x+ 10, this.y + -3.5);
        this.g2 = rotatePoint(this.x, this.y, this.radian, this.x+ 18, this.y + -3.5);
        this.g3 = rotatePoint(this.x, this.y, this.radian, this.x+ 18, this.y );
        this.g4 = rotatePoint(this.x, this.y, this.radian, this.x+ 10, this.y );
        this.nwX = this.g1.x;
        this.nwY = this.g1.y;
        this.swX = this.g2.x;
        this.swY = this.g2.y;
        this.neX = this.g3.x;
        this.neY = this.g3.y;
        this.seX = this.g4.x;
        this.seY = this.g4.y;
        this.gunRadian = this.g2.r; 
        this.recoil -= 1;

        if (game.mouse.pressed && this.recoil <= 0) {
            this.recoil = this.fireRate;
            let bullet = new Projectile(this.swX +2,this.swY ,this.radian);
            game.bulletManager.addProjectile(bullet);
            
        }
    }
    draw(game) {
      game.context.fillStyle = '#929292';
      game.context.beginPath()      
      game.context.moveTo(this.g1.x, this.g1.y);
      game.context.lineTo(this.g2.x, this.g2.y);      
      game.context.lineTo(this.g3.x, this.g3.y);      
      game.context.lineTo(this.g4.x, this.g4.y)
      game.context.stroke();
      game.context.fill();


      

      
    }
    
}
