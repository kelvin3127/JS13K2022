
import { randomBetween } from "./util.js";

export default class Obstacle {

    constructor(x,y,type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = 0;
        this.height = randomBetween(50, 300);
        this.radius = randomBetween(50, 300);
        this.centerX = 0;
        this.centerY = 0;
        this.radius = randomBetween(10, 40);
        this.objState = false;
        this.dmg = 0;
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