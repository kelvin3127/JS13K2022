export default class Bullet {
    //x, y, angle of the player
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = 16;
    }
    
    shoot() {
      
    }
    
    draw() {
        //Actual bullet picture
      push();
      fill(0);
      circle(this.x, this.y, 5);
      pop();
    }
    
    update() {
      this.x += this.speed * cos(this.angle);
      this.y += this.speed * sin(this.angle);
    }
  }