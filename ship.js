(function(){

  var MovingObject = window.Asteroids.MovingObject;
  var Coordinate = window.Asteroids.utils.Coordinate;
  var Bullet = window.Asteroids.Bullet;

  var Ship = window.Asteroids.Ship = function(options){
    this.color = "#ff0000";
    this.radius = 20;
    this.vel = new Coordinate(0, 0);
    this.pos = options.pos;
  }

  Ship.inherits(window.Asteroids.MovingObject)

  Ship.prototype.power = function (impulse) {
    this.vel = this.vel.add(impulse);
    // this.vel.wrap(5,5);
  }

  Ship.prototype.fireBullet = function () {
    var bullet = new Bullet({vel: this.vel.multiplier(3), pos: this.pos});
    window.g.game.bullets.push(bullet);
    setTimeout(function(){
      window.g.game.removeObject(bullet)
    },2000);
  }



})();
