export default class CollideManager {
    constructor() {     
        //broadTest and inView may actually be the same thing lol
        this.broadTest = [];  
        this.inView = [];
    }

    isCollide(objA, objB) {
        //assuming both obj are circles
        let squareDist = (objA.x - objB.x) ** 2 + (objA.y - objB.y) ** 2
        let squareRadius = (objA.hitRadius + objB.hitRadius)**2
        return squareDist <= squareRadius;
    }
    isCollideCircletoRect(circleObj, rectObj) {
        let distX = Math.abs(circleObj.x - rectObj.centerX);
        let distY = Math.abs(circleObj.y - rectObj.centerY);
        let dx = distX - rectObj.width/2;
        let dy = distY - rectObj.height/2;
        //distance test
        if (distX > (rectObj.width/2 + circleObj.radius)) {
            return false;
        }
        if (distY > (rectObj.height/2 + circleObj.radius)) {
            return false;
        }
        if (distX <= (rectObj.width/2)) {
            return true;
        }
        if (distY <= (rectObj.height/2)) {
            return true;
        }
        return (dx*dx + dy*dy) <= (circleObj.radius * circleObj.radius);
    }

    update(game) {
        let cells = game.world.cells;
        let bullets = game.bulletManager.clip;
        let player = game.player;
        let enemies = game.enemyManager.enemies;

        //obstacles
        for (let i = 0;i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                if (player.inView(cells[i][j])) {
                    //preprocess cells in view
                    cells[i][j].inView = true;
                    this.inView.push(cells[i][j]);
                }
                if (cells[i][j].inView && cells[i][j].obstacle != null) {
                    //bullet to obst
                    for (let k = 0; k < bullets.length; k++) {
                        if (cells[i][j].obstacle.type === 1) {
                            if (this.isCollideCircletoRect(bullets[k],cells[i][j].obstacle)) {
                                bullets[k].isDestroyed = true;
                            }
                        }
                        else {
                            if (this.isCollide(bullets[k], cells[i][j].obstacle)) {
                                bullets[k].isDestroyed = true;
                            }
                        }
                    }
                    //player to obst
                    if (cells[i][j].obstacle.type === 1) {
                        if (this.isCollideCircletoRect(player,cells[i][j].obstacle)) {
                            //console.log("player to obst works");
                            let distance_x = player.x - cells[i][j].obstacle.x;
                            let distance_y = player.y - cells[i][j].obstacle.y;
                            let length = Math.sqrt(distance_x ** 2 + distance_y**2);
                            let unit_x = distance_x/length;
                            let unit_y = distance_y/length;
                            player.x = cells[i][j].obstacle.x + (player.hitRadius + cells[i][j].obstacle.hitRadius) * unit_x;
                            player.y = cells[i][j].obstacle.y + (player.hitRadius + cells[i][j].obstacle.hitRadius) * unit_y;
                        }
                    }
                    else {
                        if (this.isCollide(player, cells[i][j].obstacle)) {
                            let distance_x = player.x - cells[i][j].obstacle.x;
                            let distance_y = player.y - cells[i][j].obstacle.y;
                            let length = Math.sqrt(distance_x ** 2 + distance_y**2);
                            let unit_x = distance_x/length;
                            let unit_y = distance_y/length;
                            player.x = cells[i][j].obstacle.x + (player.hitRadius + cells[i][j].obstacle.hitRadius) * unit_x;
                            player.y = cells[i][j].obstacle.y + (player.hitRadius + cells[i][j].obstacle.hitRadius) * unit_y;
                        }
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
                    for (let k = 0;k < player.flashlight.rays; k++) {
                        let player_obstRay = {
                            x: Math.abs(player.flashlight.rays[k].a.x - cells[i][j].x),
                            y: Math.abs(player.flashlight.rays[k].a.y - cells[i][j].y)
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