
let mapHeight = 600;
let mapLength = 600;

//Characters
let player;
let monsters = []
let boss;

//Spawn time
let monsterSpawnTime = 300;
let monsterMaxSpeed = 2;
let bossMaxSpeed = 1;
let frame = 0;

//Score
let score = 0;



function setup() {
    //Create Canvas
  createCanvas(mapHeight, mapLength);
    //Create Player
  player = new Player();
}

//Player shoot function
function mouseClicked() {
    player.shoot();
}

function draw() {
  background(100, 100, 100);
  //rectMode(CENTER);
    //Draw Player
  player.sprite();
    //Event Listener for player movement
  player.movement();

  //for loop to make monsters
  for ( let i = monsters.length - 1; i >= 0; i--) {
    monsters[i].sprite();
    monsters[i].movement();

    if (monsters[i].attacked()) {
        restart();
        break;
    }

    //if hits remove monster
    if (player.hasShot(monsters[i])) {
        //Add point
        score++;
        monsters.splice(i, 1);
    }
  }

  //Monster Difficulty Spawn
  if (frame >= monsterSpawnTime) {

    //Make Boss
    // if (frame === 500) {
    //     boss = new Boss(1);
    //     boss.sprite();
    //     boss.movement();
    // }
    
    monsters.push(new Monster(2));
    monsterSpawnTime *= 0.95;
    frame = 0;
  }

  //Monster Difficulty Speed
  if (frameCount % 1000 == 0) {
    monsterMaxSpeed += 0.1;
    bossMaxSpeed += 0.01;
  }

  frame++;

  //Show Score
  textAlign(CENTER);
  textSize(40);
  text(score, width/2, 100);
    
}

function restart() {
    player = new Player();
    monsters = [];
    monsterSpawnTime = 300;
    monsterMaxSpeed = 2;
    bossMaxSpeed = 1;
    score = 0;
}