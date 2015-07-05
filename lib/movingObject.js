(function() {
  "use strict";
  var mirrors = {};

  $(function() {
    var Coordinate = window.Asteroids.Coordinate;

    this.leftMirror = new Coordinate(window.Asteroids.gameview.game.DIM_X, 0);

    this.rightMirror = new Coordinate(0 , window.Asteroids.gameview.game.DIM_Y);

    this.bothMirror = new Coordinate(window.Asteroids.gameview.game.DIM_X,
                                     window.Asteroids.gameview.game.DIM_Y);

  }.bind(mirrors));

  var MovingObject = window.Asteroids.MovingObject = function(options) {
    options = options || {};

    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;

  };

  MovingObject.prototype.draw = function(ctx) {
    this.render(ctx, this.pos);
    this.render(ctx, this.pos.add(mirrors.leftMirror));
    this.render(ctx, this.pos.add(mirrors.rightMirror));
    this.render(ctx, this.pos.add(mirrors.bothMirror));
  };

  MovingObject.prototype.render = function(ctx, coord, options) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(
      coord.x - window.Asteroids.gameview.game.BUFF,
      coord.y - window.Asteroids.gameview.game.BUFF,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      coord.x - window.Asteroids.gameview.game.BUFF,
      coord.y - window.Asteroids.gameview.game.BUFF,
      this.radius - 3,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    return this.pos = this.pos.add(this.vel);
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    return ((this.pos.dist(otherObject.pos) < this.radius + otherObject.radius));
  }

})();
