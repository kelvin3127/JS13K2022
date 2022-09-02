export default class Projectile {
    //x, y, angle of the player
    constructor(x, y, radian, game, color) {
      this.x = x;
      this.y = y;
      //this.velocity = velocity;
      this.radius = 10;
      this.maxFrames = 15;
      this.color = '#4d2600';
      this.isDestroyed = false;
      this.radian = radian;
      this.game = game;
    }
    
    draw() {
      //Actual bullet picture
      if (!this.isDestroyed) {
        this.game.context.fillStyle = this.color;
        this.game.context.beginPath();
        this.game.context.arc( this.x, this.y, this.radius, 0, 2*Math.PI );
        this.game.context.fill();
      }
    }
    
/*     update() {
      this.x += this.speed * cos(this.angle);
      this.y += this.speed * sin(this.angle);
    } */
  }