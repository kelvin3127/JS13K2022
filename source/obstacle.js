import { randomBetween } from "./util.js";

export default class Obstacle {

    constructor(id,x,y,cell_length,type=0) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.type = type;
        this.cell_length = cell_length;
        this.width = this.cell_length;
        this.height = this.cell_length;
        this.radius = this.cell_length/2 ;
        this.objState = false;
        this.dmg = 0;
        this.speed = 0;

        //Hitbox data
        this.hitRadius = this.radius;
        //rectangle
        if (this.type === 1) {
            this.centerX = this.x + this.width/2;
            this.centerY = this.y + this.height/2;
        }
        //circle
        else if (this.type === 0) {
            this.x = (this.x + this.x + this.cell_length)/2;
            this.y = (this.y + this.y + this.cell_length)/2;
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