import Start from './start.js';
import End from './end.js';
import Player from './player.js';
import Mouse from './mouse.js';
import Keyboard from './keyboard.js';
import Gamestate from './gamestate.js';
import Timer from './timer.js';
import World from './world.js';
import { randomIntInRange, generateSeed, magnitude } from './util.js';

export default class Game {

    constructor() {

        //Defaults
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();
        this.start = new Start();
        this.end = new End();
        this.timer = null;

        //The Game States
        this.gameState = new Gamestate([
			'PLAYING',
			'PAUSED',
			'MENU',
			'END',
		]);

        //Default State Start
        this.gameState.set('MENU');

        //Map Size
        this.width = 1500;
        this.height = 1500;

        //Canvas
        this.canvas = document.getElementById('mainCanvas');
        this.canvas.width = this.width;
		this.canvas.height = this.height;

        //Canvas Context
        this.context = this.canvas.getContext('2d');

		//World seed
		this.seed = generateSeed();

        //Frame Count
        this.frame = 0;

        this.backgroundColor = '#666';

        //Game Objects
        this.player = null;  

        // Timestamp
        this.lastTimestamp = new Date();
		this.deltaTime = 0;
        
		//FOV gradient

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

        //this.messages.add('Survive Death', 60*2);

        this.gameState.set('PLAYING');

    }

    update() {

		//Check State
		switch (this.gameState.get()) {
			case 'MENU':
				//Update Start
				this.start.update(this);

				break;
			case 'PLAYING':

				this.wind = Math.sin(this.frame / 40);

				//Update Player
				this.player.update(this);

				//Clear Keyboard
				this.keyboard.clearKeys();

				//Update Timer
				this.timer.update();

				//this.messages.update();

				break;
			case 'END':

				//Update End
				this.end.update(this);

			default:

		}

	}

    draw() {

		//Clear Canvas
		this.clear();

		//Check State
		switch (this.gameState.get()) {
			case 'MENU':

				//Draw Start
				this.start.draw(this);

				break;
			case 'PLAYING': {

				//Get Translate Coords
				const x = this.width/2 - this.player.x;
				const y = this.height/2 - this.player.y;

				//Translate Context
				this.context.translate(x, y);

				//Draw NPCs

				//this.player.drawBefore(this);

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
				//this.messages.draw(this);

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
		this.gameState = PAUSED;
	}

	unpause() {
		this.gameState = PAUSED;
	}

	clear() {

		// clear canvas
		//this.context.clearRect(0, 0, this.width, this.height);

		// fill with ambient color
		this.context.fillStyle = this.backgroundColor;
		this.context.fillRect(0, 0, this.width, this.height);
	}

}
