import {isBetween} from './util.js';

export default class CollideManager {
    constructor() {     
        this.broadTest = [];  
    }

    isCollide(objA, objB) {
        // horizontal gap
        //console.log('called');
        if (objA.nwX > objB.seX || objB.nwX > objA.seX) return false;

        // has vertical gap
        if (objA.nwY > objB.seY || objB.nwY > objA.seY) return false;
    
        return true;
    }

    pushBack (objA, objB) {
        if (objA.x > objB.x) {
            objA.x += 5*objA.speed;
        }
        if (objA.y > objB.y) {
            objA.y += 5*objA.speed;
        }
        if (objA.x < objB.x) {
            objA.x -= 5*objA.speed;
        }
        if (objA.y < objB.y) {
            objA.y -= 5*objA.speed;
        }
    }


    update(game) {
        let cells = game.world.cells;
        let bullets = game.bulletManager.clip;
        let player = game.player;

        for (let i = 0;i < cells.length; i++) {
            //bullet to obst
            if (bullets.length > 0) {
                for (let j = 0; j < bullets.length; j++) {
                    if (this.isCollide(bullets[j], cells[i].obstacle)) {
                        bullets[j].isDestroyed = true;   
                    }
                }
            }
            //player to obst
            if (this.isCollide(player, cells[i].obstacle)) {
                console.log("player touched");
                player.x += 2.5 * Math.cos(-player.radian);
                player.y += 2.5 * Math.sin(-player.radian);
                console.log(player.x,player.y);
            }
            
        }


    }
}