export default class Mouse {

    constructor(canvas) {

        this.x = 0;
        this.y = 0;
        this.pressed = false;


        canvas.addEventListener("mousemove", this.mousemove.bind(this));
        canvas.addEventListener('mousedown', this.mousedown.bind(this));
        canvas.addEventListener('mouseup', this.mouseup.bind(this));
    }

    mousemove(event) {
        this.x = event.clientX;
        this.y = event.clientY;
    }

    mousedown(event) {
        this.pressed = true;
        
    }

    mouseup(event) {
        this.pressed = false;
    }

}

