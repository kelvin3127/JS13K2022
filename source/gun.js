import Projectile from './projectile.js';
import {rotatePoint} from './util.js';

export default class Gun {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.radian = 0

        this.recoil = 0;
        this.fireRate = 25;

        this.nwX = x;
        this.nwY = y;
        this.swX = x;
        this.swY = y;
        this.neX = x;
        this.neY = y;
        this.seX = x;
        this.seY = y;

        //hitbox gun data
        this.gunnwX = x;
        this.gunnwY = y;
        this.gunswX = x;
        this.gunswY = y;
        this.gunneX = x;
        this.gunneY = y;
        this.gunseX = x;
        this.gunseY = y;

        this.g1 = {x:0, y:0, r:0};
        this.g2 = {};
        this.g3 = {};
        this.g4 = {};
        this.g5 = {};
        this.g6 = {};
        this.g7 = {};
        this.g8 = {};

        
    }
    update(game, radian, x,y){
        this.recoil -= 1;
        this.radian = radian;
        this.x = x;
        this.y = y;


        this.g1 = rotatePoint(this.x, this.y, this.radian, this.x+20, this.y);
        this.g2 = rotatePoint(this.x, this.y, this.radian, this.x+40, this.y - 2);
        this.g3 = rotatePoint(this.x, this.y, this.radian, this.x+40, this.y + 2);
        this.g4 = rotatePoint(this.x, this.y, this.radian, this.x+20, this.y + 2);

        this.nwX = this.g1.x;
        this.nwY = this.g1.y;
        this.swX = this.g2.x;
        this.swY = this.g2.y;
        this.neX = this.g3.x;
        this.neY = this.g3.y;
        this.seX = this.g4.x;
        this.seY = this.g4.y;

        this.g5 = rotatePoint(this.x, this.y, this.radian, this.x+12, this.y -4);
        this.g6 = rotatePoint(this.x, this.y, this.radian, this.x+27.5, this.y - 4);
        this.g7 = rotatePoint(this.x, this.y, this.radian, this.x+27.5, this.y + 4);
        this.g8 = rotatePoint(this.x, this.y, this.radian, this.x+12, this.y + 4);

        this.gunRadian = this.g6.r; 
        this.gunnwX = this.g5.x;
        this.gunnwY = this.g5.y;
        this.gunswX = this.g6.x;
        this.gunswY = this.g6.y;
        this.gunneX = this.g7.x;
        this.gunneY = this.g7.y;
        this.gunseX = this.g8.x;
        this.gunseY = this.g8.y;

        // if not reloading
                if (game.mouse.pressed && this.recoil <= 0) {
                    
                    this.recoil = this.fireRate;
                    //let lastBullet = game.bulletManager.clip[game.bulletManager.clip.length-1];
                    }
    }
    draw(game) {
      //Gun
      game.context.fillStyle = '#929292';
      game.context.beginPath()      
      game.context.moveTo(this.g1.x, this.g1.y);
      game.context.lineTo(this.g2.x, this.g2.y);      
      game.context.lineTo(this.g3.x, this.g3.y);      
      game.context.lineTo(this.g4.x, this.g4.y)
      game.context.stroke();
      game.context.fill();

      game.context.fillStyle = '#929292';
      game.context.beginPath()      
      game.context.moveTo(this.g5.x, this.g5.y);      
      game.context.lineTo(this.g6.x, this.g6.y);     
      game.context.lineTo(this.g7.x, this.g7.y);     
      game.context.lineTo(this.g8.x, this.g8.y)
      game.context.stroke();
      game.context.fill(); 
    }
    
}
