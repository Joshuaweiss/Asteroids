(function() {
  "use strict";

  var Coordinate = window.Asteroids.Coordinate;
  var MovingObject = window.Asteroids.MovingObject;
  var Asteroid = window.Asteroids.Asteroid;
  var Ship = window.Asteroids.Ship;

  window.Asteroids.DIM_X = 1000;
  window.Asteroids.DIM_Y = 600;

  var Game = window.Asteroids.Game = function (background) {
    this.DIM_X = window.Asteroids.DIM_X;
    this.DIM_Y = window.Asteroids.DIM_Y;
    this.BUFF = 70;
    this.NUM_ASTEROIDS = 6;
    this.asteroids = [];
    this.addAsteroids();
    this.background = background;
    if (!background) {
      this.ship = new Ship({pos: Coordinate.prototype.random(this.DIM_X, this.DIM_Y)});
    }
    this.bullets = [];
    this.score = 0;
  };

  Game.prototype.allObjects = function () {
    var all = [];
    if (this.bullets) {
      all = all.concat(this.asteroids.concat(this.bullets));
    }
    if (!this.background && this.ship) all = all.concat(this.ship);
    return all;
  }

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++){
      var asteroid = new Asteroid();
      while (this.collidesWithAnything(asteroid)) {asteroid = new Asteroid();}
      this.asteroids.push(asteroid);
    }
  };

  Game.prototype.collidesWithAnything = function(check){
    return this.allObjects().some(function(obj){
      return obj.isCollidedWith(check);
    });
  }

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

    if (!this.background) this.ship.draw(ctx);

    this.renderHud(ctx);
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
      if (!this.background && this.asteroids[i].isCollidedWith(this.ship)){
        this.shipReset();
      }

      for (var j = 0; j < this.bullets.length; j++){
        if (this.asteroids[i].isCollidedWith(this.bullets[j])){
          thingsToRemove.push(this.asteroids[i]);
          thingsToRemove.push(this.bullets[j]);
          this.score += this.asteroids[i].points;
          asteroidsToAdd = asteroidsToAdd.concat(this.asteroids[i].colideBullet(this.bullets[j]));
        }
      }

      for (var j = i + 1; j < this.asteroids.length; j++){
        this.asteroids[i].colideWithAsteroid(this.asteroids[j]);
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

  Game.prototype.renderHud = function(ctx) {
    if (!this.background) {
      ctx.font = "20px Lato";
      ctx.fillStyle = "white";
      ctx.fillText("Score: " + this.score, this.DIM_X - 140, + 30);
    }
  }

  Game.prototype.shipReset = function () {
    this.ship.pos = Coordinate.prototype.random(this.DIM_X, this.DIM_Y);
    this.ship.vel = new Coordinate(0, 0);
  };


})();
