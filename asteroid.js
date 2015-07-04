(function() {
  "use strict";

  var Coordinate = window.Asteroids.Coordinate
  var MovingObject = window.Asteroids.MovingObject

  var COLOR = "#AAAAAA";
  var RADIUS = 30;

  var randomColor = function() {
    return "rgb(" + Math.floor(Math.random() * 1000 % 255) + "," + Math.floor(Math.random() * 1000 % 255) + "," + Math.floor(Math.random() * 1000 % 255) + ")";
  };

  var Defaults = function(){
    this.color = randomColor();
    this.radius = Math.floor(Math.random() * 10000 % 40) + 15;
    this.vel = Coordinate.prototype.random(10, 10);
    this.pos = Coordinate.prototype.random(1000, 1000);
  };

  var Asteroid = window.Asteroids.Asteroid = function(options) {
    MovingObject.call(this, new Defaults().merge(options));
  };

  Asteroid.inherits(window.Asteroids.MovingObject);

  Asteroid.prototype.random = function (maxX, maxY){
    return new Asteroid({pos: Coordinate.prototype.random(maxX, maxY)});
  }

  Asteroid.prototype.colideWithAsteroid = function(otherAsteroid) {
    var diff = this.pos.diff(otherAsteroid.pos);
    var effectPerc = this.radius / (this.radius + otherAsteroid.radius);
    var myVel = this.vel.norm();
    this.vel = this.vel.multiplier(effectPerc).add(diff.withMag(otherAsteroid.vel.norm() * (1 - effectPerc))).multiplier(1.3);
    otherAsteroid.vel = otherAsteroid.vel.multiplier(1-effectPerc).add(diff.multiplier(-1).withMag(myVel * effectPerc)).multiplier(1.3);
  };

  Asteroid.prototype.colideBullet = function(bullet) {
    var asteroidOneDiff = this.pos.diff(bullet.pos).withMag(this.radius).rotate(Math.PI/2);
    var asteroidTwoDiff = this.pos.diff(bullet.pos).withMag(this.radius).rotate(-Math.PI/2);
    if (this.radius > 25) {
      return [
                new Asteroid({
                  pos: this.pos.add(asteroidOneDiff),
                  vel: asteroidOneDiff.multiplier(0.3),
                  color: this.color,
                  radius: this.radius / 2
                }),
                new Asteroid({
                  pos: this.pos.add(asteroidTwoDiff),
                  vel: asteroidTwoDiff.multiplier(0.3),
                  color: this.color,
                  radius: this.radius / 2
                })
              ]
      }
      return []
  };

})();
