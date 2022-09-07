export default class Projectile {
    //x, y, angle of the player
    constructor(x, y, radian) {
      this.x = x;
      this.y = y;
      this.radius = 2.5;
      this.maxFrames = 15;
      this.color = 'red';
      this.isDestroyed = false;
      this.radian = radian;
      this.maxX = x + 500*Math.cos(this.radian);
      this.maxy = y + 500*Math.sin(this.radian);
      this.projectFrames = 0;
      
      this.negmaxX = x - 500*Math.cos(this.radian);
      this.negmaxY = y - 500*Math.sin(this.radian);
      
    }
}