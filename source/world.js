import Cell from "./cell.js";

export default class World {
    constructor (game) {
        this.game = game;
        this.size = 150;
        this.obsCount = 25;
        this.dist = 1000;
        this.drawable = true;
        this.cells = [];
        this.id = 1;
        this.mapWidth = 2*game.canvas.width;
        this.mapHeight = 2*game.canvas.height;
        
        for (let i = -game.canvas.width; i < game.canvas.width; i+= this.dist) {
            for (let j = -game.canvas.height; j < game.canvas.height; j+= this.dist) {
                this.cells.push(new Cell(this.id,i,j,this.dist));
                this.id += 1;  
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