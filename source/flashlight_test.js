import {rotatePoint} from './util.js';

export default class Flashlight{
    constructor(x,y) {
        this.x = x;
        this.y = y;

        this.f1 = {};
        this.f2 = {};
        this.f3 = {};
        this.f4 = {};
        this.f5 = {};
        this.f6 = {};

        this.fl1 = {};
        this.fl2 = {};
        this.fl3 = {};
        this.maxDistance = 500;
        this.test_ray = {
            a: {x:0, y:0},
            b: {x:0, y:0}
        }
        this.test_ray_1 = {
            a: {x:0, y:0},
            b: {x:0, y:0}
        }
        this.test_ray_2 = {
            a: {x:0, y:0},
            b: {x:0, y:0}
        }
        this.rays=[];

    }
}
