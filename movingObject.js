(function() {
  "use strict";
  var mirrors = {};

  $(function() {
    var Coordinate = window.Asteroids.Coordinate;

    this.leftMirror = new Coordinate(window.Asteroids.gameview.game.DIM_X -
                                    window.Asteroids.gameview.game.BUFF,
                                    -window.Asteroids.gameview.game.BUFF);

    this.rightMirror = new Coordinate(- window.Asteroids.gameview.game.BUFF,
                                       window.Asteroids.gameview.game.DIM_Y -
                                       window.Asteroids.gameview.game.BUFF);

    this.bothMirror = new Coordinate(window.Asteroids.gameview.game.DIM_X - window.Asteroids.gameview.game.BUFF,
                                    window.Asteroids.gameview.game.DIM_Y - window.Asteroids.gameview.game.BUFF);

  }.bind(mirrors));

  var MovingObject = window.Asteroids.MovingObject = function(options) {
    options = options || {};

    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;

  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos.x - window.Asteroids.gameview.game.BUFF,
      this.pos.y - window.Asteroids.gameview.game.BUFF,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();

    this.drawClone(ctx);
  };

  MovingObject.prototype.drawClone = function(ctx) {

    var leftMirrorPosition = this.pos.add(mirrors.leftMirror);
    ctx.beginPath();
    ctx.arc(
      leftMirrorPosition.x,
      leftMirrorPosition.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();

    var rigthMirrorPosition = this.pos.add(mirrors.rightMirror);
    ctx.beginPath();
    ctx.arc(
      rigthMirrorPosition.x,
      rigthMirrorPosition.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();

    var bothMirrorPosition = this.pos.add(mirrors.bothMirror);
    ctx.beginPath();
    ctx.arc(
      bothMirrorPosition.x,
      bothMirrorPosition.y,
      this.radius,
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
