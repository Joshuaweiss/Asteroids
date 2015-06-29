(function() {

  var Coordinate = window.Asteroids.utils.Coordinate;
  var MovingObject = window.Asteroids.MovingObject;
  var Asteroid = window.Asteroids.Asteroid;
  var Ship = window.Asteroids.Ship;

var Game = window.Asteroids.Game = function () {
  this.DIM_X = 1400;
  this.DIM_Y = 700;
  this.NUM_ASTEROIDS = 5;
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
    this.asteroids.push(Asteroid.prototype.random(this.DIM_X, this.DIM_Y));
  }
};

Game.prototype.draw = function(ctx) {
  var allObjects = this.allObjects();
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  for (var i = 0; i < allObjects.length; i++){
    if (allObjects[i]) {
      allObjects[i].draw(ctx);
    }
  }

  this.ship.draw(ctx)
};

Game.prototype.move = function() {
  var allObjects = this.allObjects();
  for (var i = 0; i < allObjects.length; i++){
    allObjects[i].move();
    allObjects[i].pos.wrap(this.DIM_X, this.DIM_Y);
  }

};

Game.prototype.checkCollisions = function () {
  thingsToRemove = []
  for (var i = 0; i < this.asteroids.length; i++){
    if (this.asteroids[i].isCollidedWith(this.ship)){
      this.shipReset();
    }

    for (var j = 0; j < this.bullets.length; j++){
      if (this.asteroids[i].isCollidedWith(this.bullets[j])){
        thingsToRemove.push(this.asteroids[i]);
        thingsToRemove.push(this.bullets[j]);
      }
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
  this.removeObjects(thingsToRemove)
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
