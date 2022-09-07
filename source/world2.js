import Obstacle from "./obstacle.js";
import {isBetween, randomBetween} from "./util.js";

export default class World {
    constructor (game) {
        this.game = game;
        this.size = 150;
        this.obsCount = 25;
        this.dist = 200;
        this.drawable = true;
        this.obstacles = [];

        this.proto = new Obstacle(0,0,0);
        this.proto.setCenter();

        this.obstacles.push(this.proto);

        this.mapWidth = game.canvas.width;
        this.mapHeight = game.canvas.height;

        while (this.mapWidth >= -500 && this.mapHeight >= -500) {


            this.obstacles.push(new Obstacle(this.mapWidth - 50, this.mapHeight - 50, 0))

            this.mapWidth -= 300;
            this.mapHeight -= 300;

        }






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

        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.inView(game, this.obstacles[i])) {
                this.obstacles[i].draw(game);

            }
        } 

    }
}