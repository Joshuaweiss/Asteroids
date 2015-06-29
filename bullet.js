(function() {
  var Coordinate = window.Asteroids.utils.Coordinate
  var MovingObject = window.Asteroids.MovingObject

  var Bullet = window.Asteroids.Bullet = function (options) {
    this.vel = options.vel
    this.pos = options.pos
    this.color = "#00FF00";
    this.radius = 5;
  }

  Bullet.inherits(MovingObject)

})();
