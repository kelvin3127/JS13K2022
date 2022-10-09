
export default class BulletManager {
    constructor() {
        this.clip = [];
        this.timer = 0;
    }

    addProjectile(projectile) {
        this.clip.push(projectile);
    }

    refreshClip(clip) {
        let newClip = [];
        if (clip.length > 0) {
            for (let i = 0; i < clip.length; i++) {
                if (!clip[i].isDestroyed) {
                    newClip.push(clip[i]);
                }
            }
        }
        return newClip;
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
            this.clip[i].x += this.clip[i].speed*Math.cos(this.clip[i].radian);
            this.clip[i].y += this.clip[i].speed*Math.sin(this.clip[i].radian);
            this.clip[i].update();
            if (this.clip[i].projectFrames >= 90) {
                this.clip[i].isDestroyed = true;
            }
        }
        this.clip = this.refreshClip(this.clip);
    }
}