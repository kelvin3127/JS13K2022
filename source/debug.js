export default class Debug {

    constructor(game) {
        this.game = game;
        this.tester = 'test';
        this.debugForm = document.getElementById('debugForm');
        this.debugForm.addEventListener('submit', this.modifyData.bind(this));
    }

    update(game) {
        this.game = game;
    }

    modifyData(event) {
        //Player speed
        if (!isNaN(Number(event.target.elements.playerSpeed.value))) {
            this.game.player.speed = Number(event.target.elements.playerSpeed.value);
        }
        //Player x
        if (!isNaN(Number(event.target.elements.playerX.value))) {
            this.game.player.x = Number(event.target.elements.playerX.value);
        }
        //player y
        if (!isNaN(Number(event.target.elements.playerY.value))) {
            this.game.player.y = Number(event.target.elements.playerY.value);
        }
        //Enemy speed
        if (!isNaN(Number(event.target.elements.enemySpeed.value))) {
            for (let i = 0; i < this.game.enemyManager.enemies.length; i++) {
                this.game.enemyManager.enemies[i].speed = event.target.elements.enemySpeed.value;
            }
        }
        //Max enemies
        if (!isNaN(Number(event.target.elements.maxEnemy.value))) {
            this.game.enemyManager.maxEnemy = Number(event.target.elements.maxEnemy.value);
        }
    }
}