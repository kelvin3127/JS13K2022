export default class Player {

    constructor( x = 0, y = 0) {

    super(x, y, '#FF005A');

    this.radius = 12;
    this.speed = 0.5;
    this.colliding = false;
    this.death = false;
    this.health = 100;
    this.ammo = 0;


    }


    resolveCollision(obj) {}

    update(game) {

        const { keyboard, mouse} = game;

        if (keyboard.isPressed(keyboard)) {
            
        }

    }

    //pickup health or ammo
    onPickup(item) {
        if (item == "health" ) {
            this.health += 20;
        }
        else if (item == "ammo") {
            this.ammo += 10;
        }
    }

    //On hit Lose health
    onHit(health) {
        if ( health <= 0) {
            death = true;
            //chagne gamestate
        }
      }
    }