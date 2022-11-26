export default class Start {

    constructor() {
      this.debug = {
        x: 100,
        y: 100,
        width: 200,
        height: 100
      };
    }


    update(game) {
        if (game.keyboard.isPressed(game.keyboard.Space)) {
          //console.log('test');
          game.play();
        }
        //switch to debug mode
        if (game.mouse.x <= this.debug.x + this.debug.width &&
            game.mouse.x >= this.debug.x &&
            game.mouse.y <= this.debug.y + this.debug.height &&
            game.mouse.y >= this.debug.y) {

            if (game.mouse.pressed) {
              if (game.currentHtml === 'index.html') {
                window.location.replace('debug.html');
                game.currentHtml = 'debug.html';
              }
              else {
                window.location.replace('index.html');
                game.currentHtml = 'index.html';
              }
            }
        }
    }

    draw(game) {

        game.context.fillStyle = 'black';
        game.context.fillRect(0, 0, game.width, game.height);
        game.context.fillStyle = '#FF005A';
        game.context.textAlign = 'center';
        game.context.font = '150px Serif';
        game.context.fillText('Shooter', game.width/2, game.height*0.4);
        game.context.fillStyle = 'white';
        game.context.font = '40px Serif';
        game.context.fillText('A random game', game.width/2, game.height*0.55);
    
        if (Math.sin(game.frame/15) > 0.2) {
          game.context.fillStyle = 'white';
          game.context.font = '30px arial';
          game.context.fillText('Press space to start', game.width/2, game.height*0.8);
        }
        
        game.context.fillStyle = 'red';
        game.context.fillRect(this.debug.x,this.debug.y,this.debug.width,this.debug.height);

        game.context.fillStyle = 'white';
        game.context.textAlign = 'center';
        game.context.font = '45px Serif';
        game.context.fillText('Debug', 200,160);

      }
}