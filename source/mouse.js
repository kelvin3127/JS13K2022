export default class Mouse {

    constructor(canvas) {

        this.x = 0;
        this.y = 0;
        this.pressed = false;


        canvas.addEventListener("mousemove", this.mousemove.bind(this));
        canvas.addEventListener('mousedown', this.mousedown.bind(this));
        canvas.addEventListener('mouseup', this.mouseup.bind(this));
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

