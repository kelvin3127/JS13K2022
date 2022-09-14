export default class CollisionManager {
    constructor() {       
    }

    isCollide(objA, objB) {
        //make exception for Obstacle types
        
    }

    pushBack (objA) {

    }


    update(game) {
        
        for ( let i = 0; i < this.clip.length; i++) {
            this.clip[i].projectFrames += 1;
            this.clip[i].x += 5*Math.cos(this.clip[i].radian);
            this.clip[i].y += 5*Math.sin(this.clip[i].radian);
            if (this.clip[i].projectFrames >= 90) {
                this.clip[i].isDestroyed = true;
            }
        }

    }
}