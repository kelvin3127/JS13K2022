import Start from './start';
import End from './End';
import Player from './player';
import Mouse from './mouse';
import Keyboard from './keyboard';
import Gamestate from './gamestate';
import Timer from './timer';
import World from './world';


class Game {

    constructor() {

        //Defaults
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();
        this.start = new Start();
        this.end = End();
        this.timer = null;

        //The Game States
        this.gameState = new Gamestate([
			'PLAYING',
			'PAUSED',
			'START',
			'END',
		]);

        //Default State Start
        this.state.set('START');

        //Map Size
        this.width = 1500;
        this.height = 1500;

        //Canvas
        this.canvas = document.getElementById('mainCanvas');
        this.canvas.width = this.width;
		this.canvas.height = this.height;

        //Canvas Context
        this.context = this.canvas.getContext('2d');

        //Frame Count
        this.frame = 0;

        this.backgroundColor = '#666';

        //Game Objects
        this.player = null;  

        // Timestamp
        this.lastTimestamp = new Date();
		this.deltaTime = 0;
        
    }

	loop() {

		//Update Frame
		this.frame++;

		//Current Time
		const now = new Date();

		//Find DeltaTime
  	    this.deltaTime = now - this.lastTimestamp;

		//Draw State
		this.draw();

		//Update State
		this.update(this.deltaTime);

		//Save Timestamp
  	this.lastTimestamp = now;

		//Request Frame and Update Loop
		requestAnimationFrame(this.loop.bind(this));

	}

    run() {

		//Game Loop
		this.loop();

	}

    play() {

        this.player = null;
		this.world = null;

        //Player
        this.player = new Player(0, 0);

        this.world = new World({
            game: this,
            r: 10,
            size: 140,
        });

        this.timer = new Timer();

        this.messages.add('Survive Death', 60*2);

        this.state.set('PLAYING');

    }

    update() {

		//Check State
		switch (this.state.get()) {
			case 'MENU':

				//Update Start
				this.start.update(this);

				break;
			case 'PLAYING':

				this.wind = Math.sin(this.frame / 40);

				// update steps
				// this.steps.forEach(step => {
				// 	step.update(this);
				// });
		
				//Update Player
				this.player.update(this);

				//Clear Keyboard
				this.keyboard.clear();

				//Update Timer
				this.timer.update();

				this.messages.update();

				break;
			case 'FINISHED':

				//Update End
				this.end.update(this);

			default:

		}

	}

    draw() {

		//Clear Canvas
		this.clear();

		//Check State
		switch (this.state.get()) {
			case 'START':

				//Draw Start
				this.start.draw(this);

				break;
			case 'PLAYING': {

				//Get Translate Coords
				const x = this.width/2 - this.player.x;
				const y = this.height/2 - this.player.y;

				//Translate Context
				this.context.translate(x, y);

				// draw the player private function
				this.player.drawBefore(this);

				//Draw Player
				this.player.draw(this);

				//Draw World
				this.world.draw(this);

				//Translate Context Back
				this.context.translate(-x, -y);

				// draw the darkness around the player
				//this.drawDarkness();

				//Draw Timer
				this.timer.draw(this);

				//Draw Message
				this.messages.draw(this);

				break;
			}
			case 'PAUSED':

				// draw pause menu
				this.drawPause();

				break;
			case 'END':

				this.end.draw(this);

				break;
			default:

		}

	}

    pause() {
		this.state = PAUSED;
	}

	unpause() {
		this.state = PAUSED;
	}

}

export default Game;