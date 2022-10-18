export default class Hud {
    constructor(game) {
        this.player_hp = game.player.health;
        this.player_maxHp = game.player.maxHealth;
        this.heartPos_x = game.player.x - 600;
        this.heartPos_y = game.player.y + 250; 
        this.heartWidth = 20;
        this.heartHeight = 30;
        this.heartSpacing = 30;
    }
    update(game) {
        this.player_hp = game.player.health;
    }

    draw(game) {
        if (this.player_hp > 0) {
            let heartPos_x = this.heartPos_x;
            let heartPos_y = this.heartPos_y;
            for (let i = 0; i < this.player_hp; i++) {
                game.context.fillStyle = "red";
                game.context.beginPath();
                game.context.rect(heartPos_x, heartPos_y, this.heartWidth, this.heartHeight);
                game.context.fill();
                heartPos_x += this.heartSpacing;
            }
        }
    }
}