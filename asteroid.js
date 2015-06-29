(function() {
  var Coordinate = window.Asteroids.utils.Coordinate
  var MovingObject = window.Asteroids.MovingObject

  var COLOR = "#AAAAAA";
  var RADIUS = 50;
  var Defaults = function(){
    this.color = COLOR;
    this.radius = RADIUS;
    this.vel = Coordinate.prototype.random();
    this.pos = Coordinate.prototype.random();
  };

  var Asteroid = window.Asteroids.Asteroid = function(options) {
    MovingObject.call(this, new Defaults().merge(options));
  };

  Asteroid.inherits(window.Asteroids.MovingObject);

})();
