(function() {
  "use strict";

  var Coordinate = window.Asteroids.utils.Coordinate
  var MovingObject = window.Asteroids.MovingObject

  var Bullet = window.Asteroids.Bullet = function (options) {
    options.color = "#00FF00"
    options.radius = 8;
    MovingObject.call(this, options);
  }

  Bullet.inherits(MovingObject)

})();
