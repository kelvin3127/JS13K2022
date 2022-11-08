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
    update(game, radian, x,y) {
        this.radian = radian;
        this.x = x;
        this.y = y;

        //Flashlight Object
        this.f1 = rotatePoint(this.x, this.y, this.radian, this.x+ 20, this.y - 7.5);
        this.f2 = rotatePoint(this.x, this.y, this.radian, this.x+ 28, this.y - 7.5);
        this.f3 = rotatePoint(this.x, this.y, this.radian, this.x+ 32, this.y - 9);
        this.f4 = rotatePoint(this.x, this.y, this.radian, this.x+ 32, this.y - 3);
        this.f5 = rotatePoint(this.x, this.y, this.radian, this.x+ 28, this.y - 4.5);
        this.f6 = rotatePoint(this.x, this.y, this.radian, this.x+ 20, this.y - 4.5);

        //Actual Light
        this.fl1 = rotatePoint(this.x, this.y, this.radian, this.x+ 28, this.y - 6);
        this.fl2 = rotatePoint(this.x, this.y, this.radian, this.x+ 60, this.y - 22);
        this.fl3 = rotatePoint(this.x, this.y, this.radian, this.x+ 60, this.y + 10);

        this.test_ray = {
            a: {x:game.player.x, y:game.player.y},
            b: {x:game.player.x + this.maxDistance*Math.cos(game.player.radian), y:game.player.y + this.maxDistance*Math.sin(game.player.radian)}
        }
        this.test_ray_1 = {
            a: {x:game.player.x, y:game.player.y},
            b: {x:game.player.x + this.maxDistance*Math.cos(game.player.radian-0.7), y:game.player.y + this.maxDistance*Math.sin(game.player.radian-0.7)}
        }
        this.test_ray_2 = {
            a: {x:game.player.x, y:game.player.y},
            b: {x:game.player.x + this.maxDistance*Math.cos(game.player.radian+0.7), y:game.player.y + this.maxDistance*Math.sin(game.player.radian+0.7)}
        }
        this.rays = [this.test_ray,this.test_ray_1,this.test_ray_2];
    }

    raycast() {
        //ray casting 
        // RAY in parametric: Point + Direction*T1
        let ray = {
            a:{x:game.player.x, y:game.player.y}
        }
        let r_px = ray.a.x;
        let r_py = ray.a.y;
        let r_dx = ray.b.x-ray.a.x;
        let r_dy = ray.b.y-ray.a.y;

        // SEGMENT in parametric: Point + Direction*T2
        let s_px = segment.a.x;
        let s_py = segment.a.y;
        let s_dx = segment.b.x-segment.a.x;
        let s_dy = segment.b.y-segment.a.y;

        // Are they parallel? If so, no intersect
        let r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
        let s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);

        if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){ // Directions are the same.
            return null;
        }
    }

    draw(game) { 

    //Flashlight
    game.context.fillStyle = '#929292';
    game.context.beginPath();      
    game.context.moveTo(this.f1.x, this.f1.y);
    game.context.lineTo(this.f2.x, this.f2.y); 
    game.context.lineTo(this.f3.x, this.f3.y);      
    game.context.lineTo(this.f4.x, this.f4.y); 
    game.context.lineTo(this.f5.x, this.f5.y);      
    game.context.lineTo(this.f6.x, this.f6.y)
    game.context.fill();

    game.context.strokeStyle = 'black';
    game.context.beginPath();
    game.context.moveTo(this.test_ray.a.x, this.test_ray.a.y);
    game.context.lineTo(this.test_ray.b.x, this.test_ray.b.y);
    game.context.stroke();
    game.context.strokeStyle = 'red';
    game.context.beginPath();
    game.context.moveTo(this.test_ray_1.a.x, this.test_ray_1.a.y);
    game.context.lineTo(this.test_ray_1.b.x, this.test_ray_1.b.y);
    game.context.stroke();
    game.context.strokeStyle = 'purple';
    game.context.beginPath();
    game.context.moveTo(this.test_ray_2.a.x, this.test_ray_2.a.y);
    game.context.lineTo(this.test_ray_2.b.x, this.test_ray_2.b.y);
    game.context.stroke();

    // game.context.fillStyle = "#FDEB71";
    // game.context.beginPath();
    // game.context.moveTo(this.fl1.x, this.fl1.y);
    // game.context.lineTo(this.fl2.x, this.fl2.y);
    // game.context.lineTo(this.fl3.x, this.fl3.y);
    // game.context.lineTo(this.fl1.x, this.fl1.y);
    // game.context.fill();


      

      
    }
    
}
