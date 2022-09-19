import Obstacle from "./obstacle.js";
import { randomBetweenInt } from "./util.js";

export default class Cell {
    constructor(id,x,y,dist) {
        this.id = id;
        this.topleftX = x;
        this.topleftY = y;
        this.length = dist;
        this.padding = 150;

        this.obsX = randomBetweenInt(this.topleftX + this.padding, this.length - this.padding);
        this.obsY = randomBetweenInt(this.topleftY + this.padding, this.length - this.padding);
        this.obstacle = new Obstacle(this.obsX,this.obsY,0);
    }
}
