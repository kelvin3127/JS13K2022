export default class Keyboard {

    constructor() {
        this.pressedKeys = {};
        this.clickedKeys = {};

        this.space = "Space";
        this.ArrowLeft = "arrowLeft";
        this.ArrowRight = "arrowRight";
        this.ArrowUp = "arrowUp";
        this.ArrowDown = "arrowDown";

        document.addEventListener('keydown', this.keydown.bind(this));
        document.addEventListener('keyup', this.keyup.bind(this));
    }

    clearKeys() {

        this.clickedKeys = {};
    }

    keydown(event) {

        console.log(event.keyCode);
        
        var keyCode = event.keyCode;
        switch (keyCode) {
          case 68: //d
            this.pressedKeys['d'] = true;
            break;
          case 83: //s
            this.pressedKeys['s'] = true;
            break;
          case 65: //a
            this.pressedKeys['a'] = true;
            break;
          case 87: //w
            this.pressedKeys['w'] = true;
            break;
          case 32: //space
            this.pressedKeys['space'] = true;
        }
	}


    keyup(event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
          case 68: //d
            this.pressedKeys['d'] = false;
            break;
          case 83: //s
            this.pressedKeys['s'] = false;
            break;
          case 65: //a
            this.pressedKeys['a'] = false;
            break;
          case 87: //w
            this.pressedKeys['w'] = false;
            break;
          case 32: //space
            this.pressedKeys['space'] = false;
        }

    }

    isPressed(key) {

        return this.pressedKeys[key];

    }

    isClicked(key) {

        return this.clickedKeys[key];

    }

}