(function() {

  var Coordinate = window.Asteroids.utils.Coordinate;
  var MovingObject = window.Asteroids.MovingObject;
  var Asteroid = window.Asteroids.Asteroid;
  var Ship = window.Asteroids.Ship;

var Game = window.Asteroids.Game = function () {
  this.DIM_X = 1400;
  this.DIM_Y = 700;
  this.NUM_ASTEROIDS = 15;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship({pos: Coordinate.prototype.random(this.DIM_X, this.DIM_Y)});
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ship)
}

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < this.NUM_ASTEROIDS; i++){
    this.asteroids.push(Asteroid.prototype.random(this.DIM_X, this.DIM_Y));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  for (var i = 0; i < this.NUM_ASTEROIDS + 1; i++){
    if (this.asteroids[i]) {
      this.asteroids[i].draw(ctx);
    }
  }

  this.ship.draw(ctx)
};

Game.prototype.move = function() {
  for (var i = 0; i < this.NUM_ASTEROIDS; i++){
    if (this.asteroids[i]) {
      this.asteroids[i].move();
      this.asteroids[i].pos.wrap(this.DIM_X, this.DIM_Y);
    }
  }
};

Game.prototype.checkCollisions = function () {
  // asteroidsToRemove = []
  for (var i = 0; i < this.asteroids.length; i++){
    if (this.asteroids[i].isCollidedWith(this.ship)){
      this.shipReset();
    }
    // for (var j = 0; j < this.asteroids.length; j++){
    //   if ((this.asteroids[i] && this.asteroids[j]) && i != j){
    //     if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          // asteroidsToRemove.push(this.asteroids[i]);
      //     // asteroidsToRemove.push(this.asteroids[j]);
      //   }
      // }
    // }
  }
  // this.removeObjects(asteroidsToRemove)
};

Game.prototype.step = function() {
  this.move();
  this.checkCollisions();
};

Game.prototype.removeObject = function(object) {
  this.asteroids = this.asteroids.filter(function(asteroid){
    return (asteroid !== object);
  });
};

Game.prototype.removeObjects = function(object) {
  this.asteroids = this.asteroids.filter(function(asteroid){
    return !object.some(function(check){
      return check === asteroid;
    });
  });
};

Game.prototype.shipReset = function () {
  this.ship.pos = Coordinate.prototype.random(this.DIM_X, this.DIM_Y);
  this.ship.vel = new Coordinate(0, 0);
};


})();
