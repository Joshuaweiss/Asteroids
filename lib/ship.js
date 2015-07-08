(function(){
  "use strict";

  var MovingObject = window.Asteroids.MovingObject;
  var Coordinate = window.Asteroids.Coordinate;
  var Bullet = window.Asteroids.Bullet;

  var Ship = window.Asteroids.Ship = function(options){
    this.color = "#cadee5";
    this.outlineColor = "white";
    this.radius = 20;
    this.vel = new Coordinate(0, 0);
    this.pos = options.pos;
  }


  Ship.inherits(window.Asteroids.MovingObject);


  Ship.prototype.power = function (impulse) {
    this.vel = this.vel.add(impulse);
    if (this.vel.norm() > 25) {
      this.vel = this.vel.withMag(25);
    }
    return this.vel;
  };

  Ship.prototype.render = function(ctx, coord, options) {
    options = options || {};
    options = options.merge({
      color: this.outlineColor,
      outlineColor: null
    });

    MovingObject.prototype.render.call(this, ctx, coord, options);

    var shootAngle = this.vel.angleFrom(new Coordinate(5, 0));
    var shootAngle = (this.vel.y < 0) ? -shootAngle : shootAngle;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(
      coord.x - window.Asteroids.gameview.game.BUFF,
      coord.y - window.Asteroids.gameview.game.BUFF,
      this.radius,
      shootAngle - Math.PI/3,
      shootAngle + Math.PI/3,
      false
    );
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      coord.x - window.Asteroids.gameview.game.BUFF,
      coord.y - window.Asteroids.gameview.game.BUFF,
      this.radius - 8,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
  };


  Ship.prototype.fireBullet = function () {
    var bullet = new Bullet({vel: this.vel.withMag(30), pos: this.pos});
    window.g.game.bullets.push(bullet);
    setTimeout(function(){
      window.g.game.removeObject(bullet);
    },300);
  }


})();
