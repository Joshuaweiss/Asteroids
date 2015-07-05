(function(){
  "use strict";

  var MovingObject = window.Asteroids.MovingObject;
  var Coordinate = window.Asteroids.Coordinate;
  var Bullet = window.Asteroids.Bullet;

  var Ship = window.Asteroids.Ship = function(options){
    this.color = "#cadee5";
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
  }


  Ship.prototype.fireBullet = function () {
    var bullet = new Bullet({vel: this.vel.withMag(30), pos: this.pos});
    window.g.game.bullets.push(bullet);
    setTimeout(function(){
      window.g.game.removeObject(bullet);
    },300);
  }


})();
