(var MovingObject = window.Asteroids.MovingObject = function(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
};

MovingObject.prototype.draw = function(ctx) {

  ctx.fillStyle = this.color
  ctx.beginPath();

  ctx.arc(
    this.position.x,
    this.position.y,
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  cat.fill();
};

MovingObject.prototype.move = function(){
  return this.pos = this.pos.add(this.vel);
}


)();
