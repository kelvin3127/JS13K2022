let Boundary = function(aVec, bVec) {
    this.a = aVec;
    this.b = bVec;
  };
  
  Boundary.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);   
    ctx.strokeStyle = "rgba(255, 1, 255, 1)";
    ctx.stroke();
  };
  