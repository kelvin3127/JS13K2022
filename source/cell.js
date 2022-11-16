import Obstacle from "./obstacle.js";
import { randomBetweenInt } from "./util.js";

export default class Cell {
    constructor(id,x,y,cellLength) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.cellLength = cellLength;
        this.obstacle = null;
        this.isVisible = true;
        this.inView = false;
        this.cellPos = {
            x: Math.floor(this.x/this.cellLength),
            y: Math.floor(this.y/this.cellLength)
        };
    }
}
