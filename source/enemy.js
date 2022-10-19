export default class Enemy {
    constructor(id,x,y,type=0) {
        //Enemy data
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = 12;
        this.type = type;
        this.maxSpeed = 0.8;
        this.speed = 0.6;
        this.speed_delta = 0.005;
        this.damage = 1;
        this.health = 3;
        this.isDead = false;
        this.dir = 0;

        //Hitbox data
        this.hitRadius = this.radius;
        this.nwX = 0;
        this.nwY = 0;
        this.swX = 0;
        this.swY = 0;
        this.neX = 0;
        this.neY = 0;
        this.seX = 0;
        this.seY = 0;
    }

    update(game) {
        this.nwX = this.x - this.radius;
        this.nwY = this.y - this.radius;
        this.swX = this.x - this.radius;
        this.swY = this.y + this.radius;
        this.neX = this.x + this.radius;
        this.neY = this.y - this.radius;
        this.seX = this.x + this.radius;
        this.seY = this.y + this.radius;
        this.dir = Math.atan2(game.player.y - this.y, game.player.x - this.x);
        this.x += this.speed * Math.cos(this.dir);
        this.y += this.speed * Math.sin(this.dir);
        if (this.speed < this.maxSpeed) {
            this.speed += this.speed_delta;
        }
        if (this.health === 0) {
            this.isDead = true;
        }
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
