export default class CollideManager {
    constructor() {     
        this.broadTest = [];  
    }

    isCollide(objA, objB) {
        //assuming both obj are circles
        let squareDist = (objA.x - objB.x) ** 2 + (objA.y - objB.y) ** 2
        let squareRadius = (objA.hitRadius + objB.hitRadius)**2
        return squareDist <= squareRadius;
        // // horizontal gap
        // if (objA.nwX > objB.seX || objB.nwX > objA.seX) return false;

        // // has vertical gap
        // if (objA.nwY > objB.seY || objB.nwY > objA.seY) return false;
    
        // return true;
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

        //obstacles
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
                let distance_x = player.x - cells[i].obstacle.x;
                let distance_y = player.y - cells[i].obstacle.y;
                let length = Math.sqrt(distance_x ** 2 + distance_y**2);
                let unit_x = distance_x/length;
                let unit_y = distance_y/length;
                player.x = cells[i].obstacle.x + (player.hitRadius + cells[i].obstacle.hitRadius) * unit_x;
                player.y = cells[i].obstacle.y + (player.hitRadius + cells[i].obstacle.hitRadius) * unit_y;
            }
            //enemies to obst
            
        }
        //enemies
        for (let i = 0;i < enemies.length;i++) {
            //bullets to enemies
            for (let j = 0; j < bullets.length;j++) {
                if (this.isCollide(bullets[j], enemies[i])) {
                    bullets[j].isDestroyed = true;
                    enemies[i].isDead = true;
                }
            }
            //player to enemies
            if (this.isCollide(player, enemies[i])) {
                player.x += 3 * Math.cos(enemies[i].dir);
                player.y += 3 * Math.sin(enemies[i].dir);

            }
        }
    }
}