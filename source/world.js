import Cell from "./cell.js";
import Obstacle from "./obstacle.js";
import { randomBetweenInt } from "./util.js";

export default class World {
    constructor (game) {
        this.game = game;
        this.size = 150;
        this.obsCount = 25;
        this.dist = 1000;
        this.drawable = true;
        this.cells = [];
        this.cell_id = 0;
        this.obst_id = 0;
        this.mapWidth = 2*game.canvas.width;
        this.mapHeight = 2*game.canvas.height;
        
        for (let i = -game.canvas.width; i < game.canvas.width; i+= this.dist) {
            for (let j = -game.canvas.height; j < game.canvas.height; j+= this.dist) {
                this.cells.push(new Cell(this.cell_id,i,j,this.dist));
                let lastCell = this.cells[this.cells.length-1];
                lastCell.obstacle = new Obstacle(this.obst_id,lastCell.obsX,lastCell.obsY);
                this.cell_id += 1; 
                this.obst_id += 1;
            }
        }        
    
    }

    inView(game, obj) {
        const { player, width, height } = game;
        return obj.x > player.x - height/2 - this.size &&
          obj.x < player.x + height/2 + this.size &&
          obj.y > player.y - height/2 - this.size &&
          obj.y < player.y + height/2 + this.size;

      }

    draw(game) {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.inView(game, this.cells[i].obstacle)) {
                this.cells[i].obstacle.draw(game);
            }
        } 
    }

}