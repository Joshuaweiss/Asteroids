(function() {

  var Coordinate = window.Asteroids.utils.Coordinate
  var MovingObject = window.Asteroids.MovingObject
  var Asteroid = window.Asteroids.Asteroid

var Game = window.Asteroids.Game = function () {
  this.DIM_X = 1000;
  this.DIM_Y = 1000;
  this.NUM_ASTEROIDS = 100;
  this.asteroids = [];
  this.addAsteroids();
};

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < this.NUM_ASTEROIDS; i++){
    this.asteroids.push(Asteroid.random(this.DIM_X, this.DIM_Y));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_Y, this.DIM_X);
  for (var i = 0; i < this.NUM_ASTEROIDS; i++){
    this.asteroids[i].draw(ctx);
  }
}

Game.prototype.move = function() {
  for (var i = 0; i < this.NUM_ASTEROIDS; i++){
    this.asteroids[i].move();
  }
}

})();
