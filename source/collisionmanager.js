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
        let enemies = game.enemyManager.enemies;

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
                //console.log(cells[i].obstacle.centerX);
                let vCollision = {x: cells[i].obstacle.centerX - player.x, y: cells[i].obstacle.centerX - player.y}
                let distance = Math.sqrt((cells[i].obstacle.centerX - player.x)*(cells[i].obstacle.centerX - player.x) + (cells[i].obstacle.centerY - player.y)*(cells[i].obstacle.centerY - player.y));
                let vCollisionNorm = {x: vCollision.x/distance, y: vCollision.y/distance};
                // console.log(vCollisionNorm);
                //console.log(distance);
                player.x += vCollisionNorm.x * 1; 
                player.y += vCollisionNorm.y * 1;
                //player.x += 2.5 * Math.cos(-player.radian);
                // player.y += 2.5 * Math.sin(-player.radian);
                // player.speed = 0;
            }
            else {

            }
            //gun to obst
        }
        for (let i = 0;i < enemies.length;i++) {
            //bullets to enemies
            for (let j = 0; j < bullets.length;j++) {
                if (this.isCollide(bullets[j], enemies[i])) {
                    bullets[j].isDestroyed = true;
                    enemies[i].isDead = true;
                }
            }
        }
    }
}