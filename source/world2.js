import Cell from "./cell.js";
import Obstacle from "./obstacle.js";
import {isBetween, randomBetween, randomBetweenInt} from "./util.js";

export default class World {
    constructor (game) {
        this.game = game;
        this.size = 150;
        this.obsCount = 25;
        this.dist = 300;
        this.drawable = true;
        this.cells = [];
        this.id = 1;
        this.mapWidth = 2*game.canvas.width;
        this.mapHeight = 2*game.canvas.height;
        
        for (let i = -game.canvas.width; i < game.canvas.width; i+= this.dist) {
            for (let j = -game.canvas.height; j < game.canvas.height; j+= this.dist) {
                this.cells.push(new Cell(i,j,this.id));
                this.id += 1;
            }
        }        

/*         for (let i = -game.canvas.width; i <= game.canvas.width; i+=100) {
            if (randomBetweenInt(0,10) > 7) {
                for (let j= -game.canvas.height; j <= game.canvas.height; j+=100) {
                    this.obstacles.push(new Obstacle(i,j,0));
                }
            }
        } */

/*         while (this.mapWidth >= -500 && this.mapHeight >= -500) {


            this.obstacles.push(new Obstacle(this.mapWidth - 50, this.mapHeight - 50, 0))

            this.mapWidth -= 300;
            this.mapHeight -= 300;

        } */

/*         while (this.obsCount > 0) {
            let x = randomBetween(50,1000);
            let y = randomBetween(50,1000);

            for (let i = 0; i < this.obstacles.length; i++) {
                let minX = this.obstacles[i].centerX - this.dist;
                let maxX = this.obstacles[i].centerX + this.dist;
                let minY = this.obstacles[i].centerY - this.dist;
                let maxY = this.obstacles[i].centerY + this.dist;

                let betweenx = isBetween(x, minX, maxX) 
                let betweeny = isBetween(y, minY, maxY)
                
                if ( betweenx == true  &&  betweeny == true ) {
                    this.drawable = false;
                    break;
                }
            }
            if (this.drawable) {
                let newObst = new Obstacle(x,y,0);
                newObst.setCenter();
                this.obstacles.push(newObst);
                this.obsCount -= 1;
            }
            this.drawable = true;
        } */
    }


    inView(game, obj) {

        const { player, width, height } = game;
    
        return obj.x > player.x - height/2 - this.size &&
          obj.x < player.x + height/2 + this.size &&
          obj.y > player.y - height/2 - this.size&&
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