import Projectile from './projectile.js';
import {rotatePoint} from './util.js';

export default class Gun {
    constructor(x,y) {
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
    }
    update(){

        // if not reloading
        if (game.mouse.pressed && this.recoil <= 0) {
        game.bulletManager.addProjectile(new Projectile(this.gunswX,this.gunswY,this.gunRadian));
        
        this.recoil = this.fireRate;
        //let lastBullet = game.bulletManager.clip[game.bulletManager.clip.length-1];
    }

        const g1 = rotatePoint(this.x, this.y, this.radian, this.x+20, this.y);
        const g2 = rotatePoint(this.x, this.y, this.radian, this.x+40, this.y - 2);
        const g3 = rotatePoint(this.x, this.y, this.radian, this.x+40, this.y + 2);
        const g4 = rotatePoint(this.x, this.y, this.radian, this.x+20, this.y + 2);

        this.nwX = g1.x;
        this.nwY = g1.y;
        this.swX = g2.x;
        this.swY = g2.y;
        this.neX = g3.x;
        this.neY = g3.y;
        this.seX = g4.x;
        this.seY = g4.y;

        const g5 = rotatePoint(this.x, this.y, this.radian, this.x+12, this.y -4);
        const g6 = rotatePoint(this.x, this.y, this.radian, this.x+27.5, this.y - 4);
        const g7 = rotatePoint(this.x, this.y, this.radian, this.x+27.5, this.y + 4);
        const g8 = rotatePoint(this.x, this.y, this.radian, this.x+12, this.y + 4);
        
        this.gunnwX = g5.x;
        this.gunnwY = g5.y;
        this.gunswX = g6.x;
        this.gunswY = g6.y;
        this.gunneX = g7.x;
        this.gunneY = g7.y;
        this.gunseX = g8.x;
        this.gunseY = g8.y;
    }
    draw() {

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
