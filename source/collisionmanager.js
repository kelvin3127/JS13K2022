export default class CollideManager {
    constructor() {     
        this.broadTest = [];  
    }

/*     rayCollide(ray, obj) {
        if (ray.a.x, 
        
        ray.a.x
        ray.a.y
    } */

    isCollide(objA, objB) {
        //assuming both obj are circles
        let squareDist = (objA.x - objB.x) ** 2 + (objA.y - objB.y) ** 2
        let squareRadius = (objA.hitRadius + objB.hitRadius)**2
        return squareDist <= squareRadius;
    }

    update(game) {
        let cells = game.world.cells;
        let bullets = game.bulletManager.clip;
        let player = game.player;
        let enemies = game.enemyManager.enemies;

        //obstacles
        for (let i = 0;i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                if (cells[i][j].obstacle != null) {
                    //bullet to obst
                    if (bullets.length > 0) {
                        for (let k = 0; k < bullets.length; k++) {
                            if (this.isCollide(bullets[k], cells[i][j].obstacle)) {
                                bullets[k].isDestroyed = true;
                            }
                        }
                    }
                    //player to obst
                    if (this.isCollide(player, cells[i][j].obstacle)) {
                        let distance_x = player.x - cells[i][j].obstacle.x;
                        let distance_y = player.y - cells[i][j].obstacle.y;
                        let length = Math.sqrt(distance_x ** 2 + distance_y**2);
                        let unit_x = distance_x/length;
                        let unit_y = distance_y/length;
                        player.x = cells[i][j].obstacle.x + (player.hitRadius + cells[i][j].obstacle.hitRadius) * unit_x;
                        player.y = cells[i][j].obstacle.y + (player.hitRadius + cells[i][j].obstacle.hitRadius) * unit_y;
                    }
                    //enemies to obst
                    for (let k = 0; k < enemies.length; k++) {
                        if (this.isCollide(enemies[k], cells[i][j].obstacle)) {
                            let distance_x = enemies[k].x - cells[i][j].obstacle.x;
                            let distance_y = enemies[k].y - cells[i][j].obstacle.y;
                            let length = Math.sqrt(distance_x ** 2 + distance_y ** 2);
                            let unit_x = distance_x/length;
                            let unit_y = distance_y/length;
                            enemies[k].x = cells[i][j].obstacle.x + (enemies[k].hitRadius + cells[i][j].obstacle.hitRadius) * unit_x;
                            enemies[k].y = cells[i][j].obstacle.y + (enemies[k].hitRadius + cells[i][j].obstacle.hitRadius) * unit_y;
                        }
                    }
                }
            }
        }
        //enemies
        for (let i = 0;i < enemies.length; i++) {
            //bullets to enemies
            for (let j = 0; j < bullets.length;j++) {
                if (this.isCollide(bullets[j], enemies[i])) {
                    bullets[j].isDestroyed = true;
                    enemies[i].health -= player.gun.damage;
                    enemies[i].speed = 0;
                }
            }
            //player to enemies
            if (this.isCollide(player, enemies[i])) {
                //let invertedDir = (enemies[i].dir + Math.PI) % (2 * Math.PI); 
                player.x += 30 * Math.cos(enemies[i].dir);
                player.y += 30 * Math.sin(enemies[i].dir);
                player.health -= enemies[i].damage;
                enemies[i].speed = 0;
            }
            //enemies to enemies
            for (let j = 0; j < enemies.length; j++) {
                if (enemies[j].id != enemies[i].id) {
                    if (this.isCollide(enemies[j],enemies[i])) {
                        let distance_x = enemies[j].x - enemies[i].x;
                        let distance_y = enemies[j].y - enemies[i].y;
                        let length = Math.sqrt(distance_x ** 2 + distance_y ** 2);
                        let unit_x = distance_x/length;
                        let unit_y = distance_y/length;
                        enemies[j].x = enemies[i].x + (enemies[j].hitRadius + enemies[i].hitRadius) * unit_x;
                        enemies[j].y = enemies[i].y + (enemies[j].hitRadius + enemies[i].hitRadius) * unit_y;
                    }
                }
            }
        }
    }
}