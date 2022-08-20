class Mouse {

    constructor() {

        this.x = 0;
        this.y = 0;

        document.addEventListener("movemouse", this.mousemove.bind(this));
    }

    mousemove(e) {
        this.x = e.clientX;
        this.y = e.clientY;
    }
}

export default Mouse;