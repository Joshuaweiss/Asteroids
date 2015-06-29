(
  var Coordinate = window.Asteroids.utils.Coordinate

  var COLOR = "#AAAAAA";
  var RADIUS = 50;

  var Asteroid = window.Asteroids.Asteroid = function(options) {
    this.color = options.color || COLOR;
    this.radius = options.radius || RADIUS;
    this.vel = options.vel || Coordinate.random();
    this.pos = options.pos || Coordinate.random();

  };

  Asteroid.inherits(window.Asteroids.MovingObject);



)();
