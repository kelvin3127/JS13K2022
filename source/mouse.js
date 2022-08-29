export default class Mouse {

    constructor() {

        this.x = 0;
        this.y = 0;
        this.pressed = false;


        document.addEventListener("mousemove", this.mousemove.bind(this));
        document.addEventListener('mousedown', this.mousedown.bind(this));
        document.addEventListener('mouseup', this.mouseup.bind(this));
    }

    mousemove(e) {
        this.x = e.clientX;
        this.y = e.clientY;
    }

    mousedown(e) {
        this.pressed = true;
    }

    mouseup(e) {
        this.pressed = false;
    }

}

