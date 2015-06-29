(function() {
  var Coordinate = window.Asteroids.utils.Coordinate
  var MovingObject = window.Asteroids.MovingObject

  var COLOR = "#AAAAAA";
  var RADIUS = 30;
  var Defaults = function(){
    this.color = COLOR;
    this.radius = RADIUS;
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

})();
