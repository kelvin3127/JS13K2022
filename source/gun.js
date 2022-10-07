import Projectile from './projectile.js';
import {rotatePoint} from './util.js';

export default class Gun {
    constructor(x,y) {
        this.gun_nwX = x;
        this.gun_nwY = y;
        this.gun_swX = x;
        this.gun_swY = y;
        this.gun_neX = x;
        this.gun_neY = y;
        this.gun_seX = x;
        this.gun_seY = y;
    }
    update(){}
    draw() {}
    
}
