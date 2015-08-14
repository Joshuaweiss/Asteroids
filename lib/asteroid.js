(function() {
  "use strict";

  var asteroidOption0 = {
    type: 0,
    color: "#e8b71a",
    radius: 60,
    points: 40
  };

  var asteroidOption1 = {
    type: 1,
    color: "#1fda9a",
    radius: 40,
    points: 30
  };

  var asteroidOption2 = {
    type: 2,
    color: "#28abe3",
    radius: 30,
    points: 25

  };

  var asteroidOption3 = {
    type: 3,
    color: "#db3340",
    radius: 25,
    points: 20
  };

  var asteroidOptions = [asteroidOption0, asteroidOption1, asteroidOption2, asteroidOption3];

  var Coordinate = window.Asteroids.Coordinate
  var MovingObject = window.Asteroids.MovingObject

  var COLOR = "#AAAAAA";
  var RADIUS = 30;

  var randomColor = function() {
    return "rgb(" + Math.floor(Math.random() * 1000 % 255) + "," + Math.floor(Math.random() * 1000 % 255) + "," + Math.floor(Math.random() * 1000 % 255) + ")";
  };

  var Defaults = function(){
    this.vel = Coordinate.prototype.random(10, 10);
    this.pos = Coordinate.prototype.random( Asteroids.DIM_X,  Asteroids.DIM_Y);
    this.outlineSize = 2;
    this.outlineColor = "white";
    this.minimumVelocity = 3;
    this.maximumVelocity = 6;
  };

  var Asteroid = window.Asteroids.Asteroid = function(options) {
    if (options && options.type) {
      this.type = options.type;
    } else {
      this.type = Math.floor(Math.random() * 100) % asteroidOptions.length;
    }
    var asteroidOption = asteroidOptions[this.type];

    var defaults = new Defaults();
    MovingObject.call(this, defaults.merge(asteroidOption.merge(options)));
  };

  Asteroid.inherits(window.Asteroids.MovingObject);

  Asteroid.prototype.colideWithAsteroid = function(otherAsteroid) {
    var BUFF = window.Asteroids.gameview.game.BUFF;
    var distance = this.pos.diff(otherAsteroid.pos).norm();
    if (distance < this.radius + otherAsteroid.radius) {
      this.affectCollision(otherAsteroid);
      otherAsteroid.affectCollision(this);
    }
    else if (distance > 470){
      var mirrors = window.Asteroids.mirrors;
      ["leftMirror", "rightMirror", "bothMirror"].forEach(function(mirrorKey){
        var mirror = mirrors[mirrorKey];
        var mirror_and_reflection = [mirror, mirror.multiplier(-1)];
        mirror_and_reflection.forEach(function(mirror){
          if (this.pos.add(mirror).diff(otherAsteroid.pos).norm() < this.radius + otherAsteroid.radius) {
            this.affectCollision(
              {
                radius: otherAsteroid.radius,
                pos: otherAsteroid.pos.add(mirror.multiplier(-1)),
                vel: otherAsteroid.vel
              }
            );
            otherAsteroid.affectCollision(
              {
                pos: this.pos.add(mirror),
                vel: this.vel,
                radius: this.radius
              }
            );
          }
        }.bind(this));
      }.bind(this));
    }
  };


  Asteroid.prototype.affectCollision = function(otherAsteroid) {
    var diff = this.pos.diff(otherAsteroid.pos);
    var effectPerc = this.radius / (this.radius + otherAsteroid.radius);
    var myVel = this.vel.norm();
    this.vel = this.vel.multiplier(effectPerc).add(diff.withMag(otherAsteroid.vel.norm() * (1 - effectPerc)));
  };


  Asteroid.prototype.colideBullet = function(bullet) {
    var asteroidOneDiff = this.pos.diff(window.Asteroids.gameview.game.ship.pos).withMag(this.radius + 30).rotate(Math.PI/2);
    var asteroidTwoDiff = this.pos.diff(window.Asteroids.gameview.game.ship.pos).withMag(this.radius + 30).rotate(-Math.PI/2);
    if (this.type < asteroidOptions.length - 1) {
      return [
        new Asteroid(
          {
            pos: this.pos.add(asteroidOneDiff),
            vel: asteroidOneDiff.withMag(10),
            type: this.type + 1
          }
        ),
        new Asteroid(
          {
            pos: this.pos.add(asteroidTwoDiff),
            vel: asteroidTwoDiff.withMag(10),
            type: this.type + 1
          }
        )
      ]
    }
    return []
  };

})();
