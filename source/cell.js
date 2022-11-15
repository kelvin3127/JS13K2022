import Obstacle from "./obstacle.js";
import { randomBetweenInt } from "./util.js";

export default class Cell {
    constructor(id,x,y,length) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.length = length;
        this.obstacle = null;
        this.isVisible = true;
    }
}
