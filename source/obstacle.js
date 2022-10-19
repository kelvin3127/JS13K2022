import { randomBetween } from "./util.js";

export default class Obstacle {

    constructor(id,x,y,cell_length,type=0) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.type = type;
        this.cell_length = cell_length;
        this.width = randomBetween(this.cell_length/2, this.cell_length);
        this.height = randomBetween(this.cell_length/2, this.cell_length);
        this.radius = randomBetween(this.cell_length/6, this.cell_length/3);
        this.objState = false;
        this.dmg = 0;
        this.speed = 0;

        //Hitbox data
        this.hitRadius = this.radius;
        if (this.type === 1) {
            this.nwX = this.x;
            this.nwY = this.y;
            this.swX = this.x;
            this.swY = this.y+this.height;
            this.neX = this.x+this.width;
            this.neY = this.y;
            this.seX = this.x+this.width;
            this.seY = this.y+this.height;
        }
        else if (this.type === 0) {
            this.x = (this.x + this.x + this.cell_length)/2;
            this.y = (this.y + this.y + this.cell_length)/2;
            this.nwX = this.x-this.radius;
            this.nwY = this.y-this.radius;
            this.swX = this.x-this.radius;
            this.swY = this.y+this.radius;
            this.neX = this.x+this.radius;
            this.neY = this.y-this.radius;
            this.seX = this.x+this.radius;
            this.seY = this.y+this.radius; 
        }
    }    

    draw(game) {   
        //circle 
        if (this.type === 0) {
            game.context.fillStyle = 'red';
            game.context.beginPath();
            game.context.arc(this.x, this.y, this.hitRadius, 0, 2*Math.PI);
            game.context.fill();
        }
        //rect
        if (this.type === 1) {
            game.context.fillStyle = 'red';
            game.context.beginPath();
            game.context.rect(this.x, this.y, this.width, this.height);
            game.context.fill();
        }
        //hitbox
        // game.context.beginPath();
        // game.context.rect(this.nwX,this.nwY,this.seX-this.nwX,this.seY-this.nwY);
        // game.context.stroke();
    } 
}