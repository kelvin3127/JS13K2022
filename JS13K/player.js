class Player extends PlayerPic {

    constructor( x = 0, y = 0) {

    super(x, y, '#FF005A');

    this.radius = 12;
    this.speed = 0.5;
    this.colliding = false;
    }


    resolveCollision(obj) {}

    update(game) {

        const { keyboard, mouse} = game;

        if (keyboard.isPressed(keyboard)) {
            
        }

    }
}