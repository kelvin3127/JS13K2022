export default class Start {

    update(game) {
        if(game.keyboard.isPressed(game.keyboard.Space)) {
          //console.log('test');
          game.play();
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
    
      }
}