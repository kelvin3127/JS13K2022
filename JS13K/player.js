class Player {
    constructor() {
        //pos with x, y location
      this.pos = createVector(width / 2, height / 2);
      this.angle = 0;
      //array of bullets
      this.bullets = [];
    }

        //Player Image
    sprite() {
        push();
        //Translate to turn direction of mouse
        translate(this.pos.x, this.pos.y);
        //Rotates
        rotate(this.angle);

        // left foot
        rect(5, -5, 2.5, 10, '#D95B43'); 

        // Left Foot
        context.beginPath();
        context.rect(20, -20, 25, 40);
        context.fillStyle = '#D95B43';
        context.fill();

        circle(0, 0, 20);
        pop();

        //adding bullets
        for (let bullet of this.bullets) {
            bullet.update();
            bullet.draw();
        }
    }


    //Player Movement
    movement() {
        let xSpeed = 0;
        let ySpeed = 0;
        if (keyIsDown(65)) {
          xSpeed = -2;
        }
    
        if (keyIsDown(68)) {
          xSpeed = 2;
        }
    
        if (keyIsDown(87)) {
          ySpeed = -2;
        }
    
        if (keyIsDown(83)) {
          ySpeed = 2;
        }
        this.pos.add(xSpeed, ySpeed);

        //Mouse Movement and Aim
        this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);

      }

      //Click to shoot event listener
      shoot() {
        this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle));
      }

      //check if we shoot a monster and remove bullet
      hasShot(monster) {
        for (let i = 0; i < this.bullets.length; i++) {
            //15 is hardcoded, you’d the radius of the player and the radius of the bullet as variables.
          if (dist(this.bullets[i].x, this.bullets[i].y, monster.pos.x, monster.pos.y) < 15) {
            this.bullets.splice(i, 1);
            return true;
          }
        }
        return false;
      }
  }