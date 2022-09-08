import Obstacle from "./obstacle.js";
import { randomBetweenInt } from "./util.js";

export default class Cell {
    constructor(x,y,id) {
        this.topleftX = x;
        this.topleftY = y;

        this.id = id;
        this.cellSize = 200;
        this.padding = 70;

        this.obsX = randomBetweenInt(this.topleftX + this.padding, this.cellSize - this.padding);
        this.obsY = randomBetweenInt(this.topleftY + this.padding, this.cellSize - this.padding);
        this.obstacle = new Obstacle(this.obsX,this.obsY,0);
        console.log(this.obstacle.x);
    }
}
