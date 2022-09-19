export default class Projectile {
    //x, y, angle of the player
    constructor(x, y, radian) {
      this.x = x;
      this.y = y;
      this.radius = 2.5;
      this.diameter = 2*this.radius
      this.maxFrames = 15;
      this.color = 'red';
      this.isDestroyed = false;
      this.radian = radian;
      this.projectFrames = 0;
      
      //Calculate max bullet draw distance
      this.maxX = x + 500*Math.cos(this.radian);
      this.maxy = y + 500*Math.sin(this.radian);
      this.negmaxX = x - 500*Math.cos(this.radian);
      this.negmaxY = y - 500*Math.sin(this.radian);
      
      //Hitbox data
      this.nwX = 0;
      this.nwY = 0;
      this.swX = 0;
      this.swY = 0;
      this.neX = 0;
      this.neY = 0;
      this.seX = 0;
      this.seY = 0;

    }

    update() {
      this.nwX = this.x-this.radius;
      this.nwY = this.y-this.radius;
      this.swX = this.x-this.radius;
      this.swY = this.y+this.radius;
      this.neX = this.x+this.radius;
      this.neY = this.y-this.radius;
      this.seX = this.x+this.radius;
      this.seY = this.y+this.radius; 
    }
}