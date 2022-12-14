import Start from './start.js';
import End from './end.js';
import Player from './player.js';
import Mouse from './mouse.js';
import Keyboard from './keyboard.js';
import Gamestate from './gamestate.js';
import Timer from './timer.js';
import World from './world.js';
import BulletManager from './bulletmanager.js';
import CollideManager from './collisionmanager.js';
import EnemyManager from './enemymanager.js';
import Hud from './hud.js';
import Debug from './debug.js';
import { randomIntInRange, generateSeed, magnitude } from './util.js';

export default class Game {

    constructor() {

        //Defaults
        this.keyboard = new Keyboard();
        this.start = new Start();
        this.end = new End();
        this.timer = null;
		this.fps = 0;

        //The Game States
		this.currentHtml = window.location.pathname.split("/").pop();
        this.gameState = new Gamestate([
			'PLAYING',
			'PAUSED',
			'MENU',
			'END'
		]);

        //Default State Start
        this.gameState.set('MENU');

        //Map Size - should be multiples of 100
        this.width = window.innerWidth;
        this.height = window.innerHeight;
		
		//Cell Length - determine size of each cell
		this.cellLength = 40;

        //Canvas
        this.canvas = document.getElementById('mainCanvas');
        this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.mouse = new Mouse(this.canvas);

		//Canvas Shake
		this.shakeX = Math.random()*10;
		this.shakeY = Math.random()*10;

		//Canvas Context
        this.context = this.canvas.getContext('2d');

		//World seed
		this.seed = generateSeed();

        //Frame Count
        this.frame = 0;

        this.backgroundColor = '#666';

        //Game Objects
        this.player = null;  
		this.bulletManager = new BulletManager();
		this.collideManager = new CollideManager();
		this.enemyManager = new EnemyManager(this);


        // Timestamp
        this.lastTimestamp = new Date();
		this.deltaTime = 0;
        
		//FOV gradient
		this.gradient = this.context.createRadialGradient(this.width/2, this.height/2, 0, this.width/2, this.height/2, 3000);
		this.gradient.addColorStop(0,'rgba(0,0,0,0.3');
		this.gradient.addColorStop(0.1, 'rgba(0,0,0,1)');

    }
	

	loop() {

		//Update Frame
		this.frame++;

/* 		if (this.frame%60 == 0){
			this.fps++
			console.log(this.fps);
		} */

		//Current Time
		const now = new Date();

		//Find DeltaTime
  	    this.deltaTime = now - this.lastTimestamp;

		//Update State
		this.update(this.deltaTime);

		//Draw State
		this.draw();

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

        this.player = new Player(this.canvas.width/2, this.canvas.height/2);

		this.world = new World(this,this.cellLength);

        this.timer = new Timer();

		this.hud = new Hud(this);

		if (this.currentHtml === 'debug.hmtl') {
			this.debug = new Debug(this);
		}
        //this.messages.add('Survive Death', 60*2);

        this.gameState.set('PLAYING');

    }
	
	drawDarkness() {

	// draw gradient
	this.context.fillStyle = this.gradient;
	this.context.fillRect(0, 0, this.width, this.height);

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

				this.enemyManager.update(this);

				this.bulletManager.update(this);
				
				this.player.update(this);

				this.keyboard.clearKeys();

				this.timer.update();

				this.collideManager.update(this);

				this.hud.update(this);
				//this.messages.update();

				//check for debug mode
				if (this.currentHtml === 'debug.html') {
					this.debug.update(this);
				}

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


				//Draw World
				this.world.draw(this);


				//Draw Projectiles
				this.bulletManager.draw(this);

				//Draw Player
				this.player.draw(this);

				//Draw Enemy
				this.enemyManager.draw(this);

				//Translate Context Back
				this.context.translate(-x, -y);

				// draw the darkness around the player
				this.drawDarkness();

				//Draw Timer
				this.timer.draw(this);

				//Draw Hud
				this.hud.draw(this);

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
