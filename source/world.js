import Cell from "./cell.js";
import Obstacle from "./obstacle.js";
import { randomBetweenInt } from "./util.js";

export default class World {
    constructor (game, cellLength) {
        this.game = game;
        this.size = 150;
        this.obsCount = 25;
        this.dist = 1000;
        this.drawable = true;
        this.cells = [];
        this.cell_id = 0;
        this.obst_id = 0;
        //Bitmap data
        this.x = 0;
        this.y = 0;
        this.mapWidth = 30;
        this.mapHeight = 30;
        this.cellLength = 40;
        this.obst_spawnRate = 5;

        for (let i = 0; i < this.mapHeight; i++) {
            let row = [];
            for (let j = 0; j < this.mapWidth; j++) {
                row.push(new Cell(this.cell_id,this.x,this.y,this.cellLength));
                this.cell_id += 1;
                if (randomBetweenInt(1,100) <= this.obst_spawnRate) {
                    row[row.length-1].obstacle = new Obstacle(this.obst_id,this.x,this.y,this.cellLength);
                    this.obst_id += 1;
                }
                this.x += this.cellLength;
            }
            this.cells.push(row);
            this.x = 0;
            this.y += this.cellLength;
        //console.table(this.cells);
        }
    }

    inView(game, obj) {
        //determines if cell in World is visible
        const { player, width, height } = game;
        return obj.x > player.x - height/2 - this.size &&
          obj.x < player.x + height/2 + this.size &&
          obj.y > player.y - height/2 - this.size &&
          obj.y < player.y + height/2 + this.size;
      }

    draw(game) {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                //DEBUG - DRAW CELL LINES
                game.context.strokeStyle = 'white';
                game.context.beginPath();
                game.context.rect(this.cells[i][j].x, this.cells[i][j].y, this.cells[i][j].cellLength, this.cells[i][j].cellLength);
                game.context.stroke();
    
                if (this.cells[i][j].inView) {
                    game.context.fillStyle = 'green';
                    game.context.beginPath();
                    game.context.rect(this.cells[i][j].x, this.cells[i][j].y, this.cells[i][j].cellLength,this.cells[i][j].cellLength);
                    game.context.fill();
                }

                if (this.cells[i][j].obstacle != null) {
                    if (this.inView(game, this.cells[i][j].obstacle)) {
                        this.cells[i][j].obstacle.draw(game);
                    }
                }
            }
        }
    }
}