// helper functions
let degreeToRadian = function(degree) {
    return (degree / 180) * Math.PI;
  };
  
// vector object
let Vector = function(x,y) {
this.x = x;
this.y = y;
};

// static vector object methods
Vector.fromAngle = function(angle, v) {
if (v === undefined || v === null) {
    v = new Vector();
}
v.x = Math.cos(angle);
v.y = Math.sin(angle);
return v;
};

Vector.dist = function(v1, v2) {
let dx = v1.x - v2.x,
    dy = v1.y - v2.y;
return Math.sqrt(dx * dx + dy * dy);
};

// vector object instance methods
Vector.prototype.mag = function() {
let x = this.x,
    y = this.y,
    z = this.z;
return Math.sqrt(x * x + y * y + z * z);
};

Vector.prototype.div = function(v) {
if (typeof v === 'number') {
    this.x /= v;
    this.y /= v;
    this.z /= v;
} else {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
}
};

Vector.prototype.normalize = function() {
let m = this.mag();
if (m > 0) {
    this.div(m);
}
};

// ray object
let Ray = function(pos, angle) {
this.pos = pos;
this.dir = Vector.fromAngle(angle);
};

/* test line used to show position a distribution of rays
Ray.prototype.draw = function(ctx) {
ctx.translate(this.pos.x, this.pos.y);
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(this.dir.x * 10, this.dir.y * 10);
ctx.strokeStyle = "rgba(255, 255, 255, 1)";
ctx.stroke();
ctx.setTransform(1, 0, 0, 1, 0, 0);
}; */

Ray.prototype.cast = function(boundary) {
const x1 = boundary.a.x;
const y1 = boundary.a.y;
const x2 = boundary.b.x;
const y2 = boundary.b.y;

const x3 = this.pos.x;
const y3 = this.pos.y;
const x4 = this.pos.x + this.dir.x;
const y4 = this.pos.y + this.dir.y;

const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
// if denominator is zero then the ray and boundary are parallel
if (den === 0) {
    return;
}

// numerator divided by denominator
let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
let u = -((x1 -x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

if (t > 0 && t < 1 && u > 0) {
    const pt = new Vector();
    pt.x = x1 + t * (x2 - x1);
    pt.y = y1 + t * (y2 - y1);
    return pt;
} else {
    return;
}
};
