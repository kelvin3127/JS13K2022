export default class Enemy {
    constructor(x,y,type=0) {
        this.x = x;
        this.y = y;
        this.radius = 8;
        this.type = type;
        this.setSpeed = 0.6;
        this.speed = this.setSpeed;
        this.damage = 5;
        this.health = 10;
        this.isDead = false;

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
    }

    draw(game) {
        if (!this.isDead) {
            game.context.fillStyle = 'blue';
            game.context.beginPath();
            game.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
            game.context.fill();
        }
    }
}
