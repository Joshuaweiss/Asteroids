(function() {
  "use strict";

  var Coordinate = window.Asteroids.Coordinate;
  var MovingObject = window.Asteroids.MovingObject;
  var Asteroid = window.Asteroids.Asteroid;
  var Ship = window.Asteroids.Ship;

  window.Asteroids.DIM_X = 1000;
  window.Asteroids.DIM_Y = 600;

  var Game = window.Asteroids.Game = function () {
    this.DIM_X = window.Asteroids.DIM_X;
    this.DIM_Y = window.Asteroids.DIM_Y;
    this.BUFF = 70;
    this.NUM_ASTEROIDS = 6;
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Ship({pos: Coordinate.prototype.random(this.DIM_X, this.DIM_Y)});
    this.bullets = [];
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  }

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++){
      this.asteroids.push(new Asteroid());
    }
  };

  Game.prototype.draw = function(ctx) {
    var allObjects = this.allObjects();
    ctx.clearRect(0, 0, this.DIM_X + this.BUFF, this.DIM_Y + this.BUFF);

    ctx.fillStyle = "#212121";
    ctx.fillRect(0, 0, this.DIM_X + this.BUFF, this.DIM_Y + this.BUFF);

    for (var i = 0; i < allObjects.length; i++){
      if (allObjects[i]) {
        allObjects[i].draw(ctx);
      }
    }

    this.ship.draw(ctx);
  };

  Game.prototype.move = function() {
    var allObjects = this.allObjects();
    for (var i = 0; i < allObjects.length; i++){
      allObjects[i].move();
      allObjects[i].pos.wrap(this.DIM_X, this.DIM_Y);
    }
  };

  Game.prototype.checkCollisions = function () {
    var thingsToRemove = [];
    var asteroidsToAdd = [];
    for (var i = 0; i < this.asteroids.length; i++){
      if (this.asteroids[i].isCollidedWith(this.ship)){
        this.shipReset();
      }

      for (var j = 0; j < this.bullets.length; j++){
        if (this.asteroids[i].isCollidedWith(this.bullets[j])){
          thingsToRemove.push(this.asteroids[i]);
          thingsToRemove.push(this.bullets[j]);
          asteroidsToAdd = asteroidsToAdd.concat(this.asteroids[i].colideBullet(this.bullets[j]));
        }
      }

      for (var j = i + 1; j < this.asteroids.length; j++){
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          this.asteroids[i].colideWithAsteroid(this.asteroids[j]);
        }
      }
    }
    this.removeObjects(thingsToRemove);
    this.asteroids = this.asteroids.concat(asteroidsToAdd);
  };

  Game.prototype.step = function() {
    this.move();
    this.checkCollisions();
  };

  Game.prototype.removeObject = function(object) {
    this.asteroids = this.asteroids.filter(function(asteroid){
      return (asteroid !== object);
    });
    this.bullets = this.bullets.filter(function(bullet){
      return (bullet !== object);
    });
  };

  Game.prototype.removeObjects = function(object) {
    this.asteroids = this.asteroids.filter(function(asteroid){
      return !object.some(function(check){
        return check === asteroid;
      });
    });
    this.bullets = this.bullets.filter(function(bullet){
      return !object.some(function(check){
        return check === bullet;
      });
    });
  };

  Game.prototype.shipReset = function () {
    this.ship.pos = Coordinate.prototype.random(this.DIM_X, this.DIM_Y);
    this.ship.vel = new Coordinate(0, 0);
  };


})();