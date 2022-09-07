export default class BulletManager {
    constructor() {
        this.clip = [];
        
    }

    addProjectile(projectile) {
        this.clip.push(projectile);

    }

    draw(game) {
        for (let i = 0; i < this.clip.length; i++){
            if (!this.clip[i].isDestroyed) {

            game.context.fillStyle = '#ffd966';
            game.context.beginPath();
            game.context.arc(
                this.clip[i].x, 
                this.clip[i].y, 
                this.clip[i].radius,
                0,
                2 *Math.PI);
            game.context.fill();

            }
        }
    }

    update(game) {

        
        for ( let i = 0; i < this.clip.length; i++) {
            this.clip[i].projectFrames += 1;
            this.clip[i].x += 5*Math.cos(this.clip[i].radian);
            this.clip[i].y += 5*Math.sin(this.clip[i].radian);
            if (this.clip[i].projectFrames >= 90) {
                this.clip[i].isDestroyed = true;
            }
        }

    }
}