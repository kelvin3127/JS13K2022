import {rotatePoint} from './util.js';

export default class Flashlight{
    constructor(x,y) {
        this.x = x;
        this.y = y;

        this.f1 = {};
        this.f2 = {};
        this.f3 = {};
        this.f4 = {};
        this.f5 = {};
        this.f6 = {};

        this.fl1 = {};
        this.fl2 = {};
        this.fl3 = {};

    }
    update(game, radian, x,y) {
        this.radian = radian;
        this.x = x;
        this.y = y;

        //Flashlight Object
        this.f1 = rotatePoint(this.x, this.y, this.radian, this.x+ 20, this.y - 7.5);
        this.f2 = rotatePoint(this.x, this.y, this.radian, this.x+ 28, this.y - 7.5);
        this.f3 = rotatePoint(this.x, this.y, this.radian, this.x+ 32, this.y - 9);
        this.f4 = rotatePoint(this.x, this.y, this.radian, this.x+ 32, this.y - 3);
        this.f5 = rotatePoint(this.x, this.y, this.radian, this.x+ 28, this.y - 4.5);
        this.f6 = rotatePoint(this.x, this.y, this.radian, this.x+ 20, this.y - 4.5);


        //Actual Light
        this.fl1 = rotatePoint(this.x, this.y, this.radian, this.x+ 28, this.y - 6);
        this.fl2 = rotatePoint(this.x, this.y, this.radian, this.x+ 60, this.y - 22);
        this.fl3 = rotatePoint(this.x, this.y, this.radian, this.x+ 60, this.y + 10);

        // this.light = this.game.context.createLinearGradient( fl1.x, fl1.x, fl2.x, fl3.x);
		// this.light.addColorStop(0,'rgba(0,0,0,0.3');
		// this.light.addColorStop(0.1, 'rgba(0,0,0,1)');

        if (game.mouse.pressed) {

        }
    }
    draw(game) { 

    //Flashlight
    game.context.fillStyle = '#929292';
    game.context.beginPath();      
    game.context.moveTo(this.f1.x, this.f1.y);
    game.context.lineTo(this.f2.x, this.f2.y); 
    game.context.lineTo(this.f3.x, this.f3.y);      
    game.context.lineTo(this.f4.x, this.f4.y); 
    game.context.lineTo(this.f5.x, this.f5.y);      
    game.context.lineTo(this.f6.x, this.f6.y)
    game.context.fill();


    // game.context.fillStyle = "#FDEB71";
    // game.context.beginPath();
    // game.context.moveTo(this.fl1.x, this.fl1.y);
    // game.context.lineTo(this.fl2.x, this.fl2.y);
    // game.context.lineTo(this.fl3.x, this.fl3.y);
    // game.context.lineTo(this.fl1.x, this.fl1.y);
    // game.context.fill();


      

      
    }
    
}
