import Enemy from "./enemy.js";
import {arcTan} from "./util.js";

export default class EnemyManager {
    constructor(game) {
        this.enemies = [];
        this.maxEnemy = 10;
        this.spawns = [[-game.width, -game.height], [game.width, -game.height], [game.width, game.height], [game.width, -game.height]];
        this.spawnIndex = 0;
        this.spawnTimer = 0;
        this.spawnRate = 300;
    }

    refreshEnemies(enemies) {
        let newEnemies = [];
        if (enemies.length > 0) {
            for (let i = 0; i < enemies.length; i++) {
                if (!enemies[i].isDead) {
                    newEnemies.push(enemies[i]);
                }
            }
        }
        return newEnemies;
    }

    update(game) {
        //spawning
        if (this.enemies.length < this.maxEnemy) {
            if (this.spawnTimer >= this.spawnRate) {
                for (let i = 0; i < this.maxEnemy; i++) {
                        let x = this.spawns[this.spawnIndex][0];
                        let y = this.spawns[this.spawnIndex][1];
                        this.enemies.push(new Enemy(x,y));
                        this.spawnIndex += 1;
                        if (this.spawnIndex === 4) {
                            this.spawnIndex = 0;
                        }
                }
                this.spawnTimer = 0;
            }
        }
        //behavior
        if (this.enemies.length > 0) {
            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].update(game);
            }
        }
        this.enemies = this.refreshEnemies(this.enemies);
        this.spawnTimer+=1;
    }

    draw(game) {
        if (this.enemies.length > 0) {
            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].draw(game);
            }
        }
    }
}
