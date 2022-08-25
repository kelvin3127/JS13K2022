var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

function makeCurvedRect(x, y, w, h) {
    context.beginPath();
    context.moveTo(x+10, y);
    context.lineTo(x+w-10, y);
    context.quadraticCurveTo(x+w, y, x+w, y+10);
    context.lineTo(x+w, y+h-10);
    context.quadraticCurveTo(x+w, y+h, x+w-10, y+h);
    context.lineTo(x+10, y+h);
    context.quadraticCurveTo(x, y+h, x, y+h - 10);
    context.lineTo(x, y+10);
    context.quadraticCurveTo(x, y, x+10, y);

}
 
function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    context.beginPath();
    context.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y)
        rot += step
    }
    context.lineTo(cx, cy - outerRadius)
    context.closePath();
}



//***************************PLAYER*************************

// // left foot
// context.beginPath();
// context.rect(20, 35, 25, 40);
// context.fillStyle = '#D95B43';
// context.fill();
// context.stroke();

// // right foot
// context.beginPath();
// context.rect(40, 35, 25, 40);
// context.fillStyle = '#D95B43';
// context.fill();
// context.stroke();

//Left hand
context.rotate(45 * Math.PI / 180);
context.beginPath();
context.rect(90, -40, 20, 80);
context.fillStyle = '#C02942';
context.fill();
context.rotate(-30 * Math.PI / 180);

//Right hand
context.rotate(-45 * Math.PI / 180);
context.beginPath();
context.rect(40, 100, 20, 60);
context.fillStyle = '#C02942';
context.fill();
context.rotate(30 * Math.PI / 180);

//Gun
makeCurvedRect(85, 30, 20, 70);
context.fillStyle = 'gray';
context.fill();

context.rect(90, 10, 10, 40);
context.fillStyle = 'gray';
context.fill();

//Torso
makeCurvedRect(35, 85, 100, 35);
context.fillStyle = '#53777A';
context.fill();


//Head
context.beginPath();
context.arc(85, 105, 30, 0, 2 * Math.PI);
context.fillStyle = '#F1D4AF';
context.fill();

//Hair
context.beginPath();
context.arc(85, 110, 30, 0, 2 * Math.PI);
context.fillStyle = '#4d2600';
context.fill();

makeCurvedRect(70, 115, 30, 30);
context.fillStyle = '#4d2600';
context.fill();

//*********************MONSTER***********************

//Body
context.beginPath();
context.arc(320, 90, 20, 0, 2*Math.PI, true);
grad1 = context.createRadialGradient(320, 70, 0, 320, 90, 20);
grad1.addColorStop(0, "#cc1d1d");
grad1.addColorStop(1, "#6e0b0b");
context.fillStyle = grad1;
context.fill();

context.beginPath();
context.arc(380, 90, 20, 0, 2*Math.PI, true);
grad2 = context.createRadialGradient(380, 70, 0, 380, 90, 20);
grad2.addColorStop(0, "#cc1d1d");
grad2.addColorStop(1, "#6e0b0b");
context.fillStyle = grad2;
context.fill();

context.beginPath();
context.arc(350, 90, 30, 0, 2*Math.PI, true);
rad_grad1 = context.createRadialGradient(350, 70, 10, 350, 90, 35);
rad_grad1.addColorStop(0, "#cc1d1d");
rad_grad1.addColorStop(1, "#871111");
context.fillStyle = rad_grad1;
context.fill();


//Horns Left
context.beginPath();
context.moveTo( 340, 85);
context.bezierCurveTo( 315, 80, 325, 55, 325, 60);
context.bezierCurveTo( 305, 90, 345, 95, 335, 95);
context.fillStyle = '#f3f6f4';
context.fill();
context.strokeStyle = '#8c8c8c'
context.stroke();

//Horns Right
context.beginPath();
context.moveTo( 360, 85);
context.bezierCurveTo( 385, 80, 375, 55, 375, 60)
context.bezierCurveTo( 390, 90, 365, 95, 360, 95)
context.fillStyle = '#f3f6f4';
context.fill();
context.stroke();

//Head
context.beginPath();
context.moveTo( 335, 85);
context.bezierCurveTo( 345, 70, 345, 55, 345, 55);
context.bezierCurveTo( 345, 55, 350, 45, 355, 55);
context.bezierCurveTo( 360, 70, 355, 70, 365, 85);
context.bezierCurveTo( 370, 100, 360, 105, 350, 105);
context.bezierCurveTo( 325, 105, 335, 85, 335, 85);
context.fillStyle = '#871111';
context.fill();

//Tail
context.beginPath();
context.moveTo(345, 120);
context.bezierCurveTo( 345, 120, 350, 120, 340, 130);
context.bezierCurveTo( 350, 125, 352, 120, 350, 120);
context.fillStyle = '#6e0b0b';
context.fill();

drawStar(340, 130, 8, 5, 7.5);
context.fillStyle = '#6e0b0b';
context.fill();

//Left hand
context.rotate(20 * Math.PI / 180);
context.beginPath();
makeCurvedRect(350, -100, 15, 60);
context.fillStyle = '#6e0b0b';
context.fill();
context.rotate(-35 * Math.PI / 180);

//Right hand
context.rotate(-45 * Math.PI / 180);
context.beginPath();
makeCurvedRect(40, 100, 15, 60);
context.fillStyle = '#6e0b0b';
context.fill();
context.rotate(35 * Math.PI / 180);







//*********************Bullet************************

//Bullet Body
context.beginPath();
context.rect(200, 30, 5, 10);
context.fillStyle = 'black';
context.fill();

//Bullet Head
context.beginPath();
context.moveTo(200, 30);
context.quadraticCurveTo(202.5, 20, 205, 30);
context.fillStyle = 'black';
context.fill();







