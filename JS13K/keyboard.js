class Keyboard {

    constructor() {
        this.pressed = {};
        this.clicked = {};

        this.space = "Space";
        this.ArrowLeft = "arrowLeft";
        this.ArrowRight = "arrowRight";
        this.ArrowUp = "arrowUp";
        this.ArrowDown = "arrowDown";

        document.addEventListener('keydown', this.keydown.bind(this));
        document.addEventListener('keyup', this.keyup.bind(this));
    }

    clearKeys() {

        if (
			!this.isPressed(event.which) ||
			!this.isPressed(event.keyCode) ||
			!this.isPressed(event.key) ||
			!this.isPressed(event.code)
		) {
			
			this.clickedKeys[event.which] = true;
			this.clickedKeys[event.keyCode] = true;
			this.clickedKeys[event.key] = true;
			this.clickedKeys[event.code] = true;
		}

		
		this.pressedKeys[event.which] = true;
		this.pressedKeys[event.keyCode] = true;
		this.pressedKeys[event.key] = true;
		this.pressedKeys[event.code] = true;

    }

    keyup(event) {

        this.pressedKeys[event.which] = false;
		this.pressedKeys[event.keyCode] = false;
		this.pressedKeys[event.key] = false;
		this.pressedKeys[event.code] = false;
    }

    isPressed(key) {

        return this.pressedKeys[key];

    }

    isClicked(key) {

        return this.clickedKeys[Key];

    }

}

export default Keyboard;