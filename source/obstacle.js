
import { randomBetween } from "./util.js";

export default class Obstacle {

    constructor(x,y,type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = randomBetween(15, 20);
        this.height = randomBetween(15, 20);
        this.radius = randomBetween(15, 20);
        this.centerX = this.x;
        this.centerY = this.y;
        this.objState = false;
        this.dmg = 0;
        this.speed = 0;

        //Hitbox data
        if (this.type == 1) {
            this.nwX = this.x;
            this.nwY = this.y;
            this.swX = this.x;
            this.swY = this.y+this.height;
            this.neX = this.x+this.width;
            this.neY = this.y;
            this.seX = this.x+this.width;
            this.seY = this.y+this.height; 
        }
        else {
            this.nwX = this.x-this.radius;
            this.nwY = this.y-this.radius;
            this.swX = this.x-this.radius;
            this.swY = this.y+this.radius
            this.neX = this.x+this.radius;
            this.neY = this.y-this.radius;
            this.seX = this.x+this.radius;
            this.seY = this.y+this.radius; 
        }
    }    

    setCenter() {
        //circle
        if (this.type == 0) {
            this.centerX = this.x;
            this.centerY = this.y;
        }
        //rect
        if (this.type == 1) {
            this.centerX = this.x + this.width/2;
            this.centerY = this.y + this.height/2;
            }
    }

    onHit() {
        if (this.dmg >= 10) {
            this.objState = true;
        }
        this.dmg += 1;
    }

    draw(game) {   
        //circle 
        if (this.type == 0) {
            game.context.fillStyle = 'red';
            game.context.beginPath();
            game.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
            game.context.fill();
        }
        //rect
        if (this.type == 1) {
            game.context.fillStyle = 'red'
            game.context.beginPath();
            game.context.rect(this.x, this.y, this.width, this.height);
            game.context.fill();
        }
    } 
}