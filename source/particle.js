export default class Particle {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.alpha = 1;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = 'red';
          
        /* Begins or reset the path for 
           the arc created */
        ctx.beginPath();
          
        /* Some curve is created*/
        ctx.arc(this.x, this.y, this.radius, 
                0, Math.PI * 2, false);

        ctx.fill();
          
        /* Restore the recent canvas context*/
        ctx.restore();
    }
    update() {
        this.draw();
        this.alpha -= 0.01;
        this.x += this.dx;
        this.y += this.dy;
    }
}
  