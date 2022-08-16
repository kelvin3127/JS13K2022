class Monster {
  
    constructor(speed) {
      this.speed = speed;
      let y;

      //Random spawn point generator
      if (random(1) < 0.5) {
        // from the top
        y = random(-300, 0);            
      } else {
        // from the bottom
        y = random(height, height + 300);
      }
      
      let x = random(-300, width + 300);
      this.pos = createVector(x, y);
    } 
    
        //Draw Sprite
    sprite() {
      push();
      fill(100, 255, 100);
      //Rotate monster towards the player
      let angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
      translate(this.pos.x, this.pos.y);
      rotate(angle);
      rect(0, 0, 20, 20);
      pop();
    }
    
        //Monster movement
    movement() {
        //Subtract the player position and monster position and limit the speed
      let difference = p5.Vector.sub(player.pos, this.pos);
      difference.limit(this.speed);
      this.pos.add(difference);
    }
        //Monster Hit return true
    attacked() {
        return dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 20;
    }
  }