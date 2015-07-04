(function() {
  "use strict";

  var asteroidOption0 = {
    type: 0,
    color: "#e8b71a",
    radius: 60
  };

  var asteroidOption1 = {
    type: 1,
    color: "#1fda9a",
    radius: 40
  };

  var asteroidOption2 = {
    type: 2,
    color: "#28abe3",
    radius: 30
  };

  var asteroidOption3 = {
    type: 3,
    color: "#db3340",
    radius: 25
  };

  var asteroidOptions = [asteroidOption0, asteroidOption1, asteroidOption2, asteroidOption3];

  var Coordinate = window.Asteroids.Coordinate
  var MovingObject = window.Asteroids.MovingObject

  $(function(){
     Asteroid.prototype.game = window.Asteroids.gameview.game;
  });

  var COLOR = "#AAAAAA";
  var RADIUS = 30;

  var randomColor = function() {
    return "rgb(" + Math.floor(Math.random() * 1000 % 255) + "," + Math.floor(Math.random() * 1000 % 255) + "," + Math.floor(Math.random() * 1000 % 255) + ")";
  };

  var Defaults = function(){
    this.color = Asteroids.utils.randomColor();
    this.radius = Math.floor(Math.random() * 10000 % 40) + 15;
    this.vel = Coordinate.prototype.random(10, 10);
    this.pos = Coordinate.prototype.random(1000, 1000);
  };

  var Asteroid = window.Asteroids.Asteroid = function(options) {
    var asteroidOption = asteroidOptions[Math.floor(Math.random() * 100) % asteroidOptions.length];
    this.type = asteroidOption.type;
    MovingObject.call(this, new Defaults().merge(asteroidOption).merge(options));
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
    var asteroidOneDiff = this.pos.diff(Asteroid.prototype.game.ship.pos).withMag(this.radius + 25).rotate(Math.PI/2);
    var asteroidTwoDiff = this.pos.diff(Asteroid.prototype.game.ship.pos).withMag(this.radius + 25).rotate(-Math.PI/2);
    if (this.type < asteroidOptions.length - 1) {
      return [
        new Asteroid(
          {
            pos: this.pos.add(asteroidOneDiff),
            vel: asteroidOneDiff.multiplier(0.3)
          }.merge(asteroidOptions[this.type + 1])
        ),
        new Asteroid(
          {
            pos: this.pos.add(asteroidTwoDiff),
            vel: asteroidTwoDiff.multiplier(0.3)
          }.merge(asteroidOptions[this.type + 1])
        )
      ]
    }
      return []
  };

})();
