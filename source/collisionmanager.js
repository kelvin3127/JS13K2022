import {isBetween} from './util.js';

export default class CollideManager {
    constructor() {     
        this.broadTest = [];  
    }

    isCollide(objA, objB) {
        // horizontal gap
        //console.log('called');
        console.log(objA.nwX);

        if (objA.nwX > objB.seX || objB.nwX > objA.seX) return false;

        // has vertical gap
        if (objA.nwY > objB.seY || objB.nwY > objA.seY) return false;
    
        return true;
    }

    pushBack (objA) {

    }


    update(game) {
        let cells = game.world.cells;
        let bullets = game.bulletManager.clip;

        for (let i = 0;i < cells.length; i++) {
            if (bullets.length > 0) {
                for (let j = 0; j < bullets.length; j++) {

                    if (this.isCollide(bullets[j], cells[i].obstacle)) {
                        bullets[j].isDestroyed = true;
                        console.log('this happened');
                        
                    }
/* 
                    if (bullets[j].x >= cells[i].topleftX &&
                        bullets[j].y >= cells[i].topleftY &&
                        bullets[j].x <= cells[i].topleftX + cells[i].length &&
                        bullets[j].y <= cells[i].topleftY + cells[i].length) {
                            this.broadTest.push();
                            //console.log("bullet in cell " + cells[i].id); 
                    } */
                }
            }

        }


    }
}