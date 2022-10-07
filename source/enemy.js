export default class Enemy {

    constructor(x,y,type=0) {
        this.x = x;
        this.y = y;
        this.radius = 8;
        this.type = type;
        this.speed = 0.2;
        this.damage = 5;
        this.health = 10;
        this.dead = false;

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

    draw() {
    }

    update() {
        
    }

}