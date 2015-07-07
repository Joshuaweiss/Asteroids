(function() {
  "use strict";
  var mirrors = window.Asteroids.mirrors = {};

  $(function() {
    var Coordinate = window.Asteroids.Coordinate;

    this.leftMirror = new Coordinate(window.Asteroids.gameview.game.DIM_X, 0);

    this.rightMirror = new Coordinate(0 , window.Asteroids.gameview.game.DIM_Y);

    this.bothMirror = new Coordinate(window.Asteroids.gameview.game.DIM_X,
                                     window.Asteroids.gameview.game.DIM_Y);

  }.bind(mirrors));

  var MovingObject = window.Asteroids.MovingObject = function(options) {
    options = options || {};

    for (var o in options) {
      this[o] = options[o];
    }

  };

  MovingObject.prototype.draw = function(ctx) {
    this.render(ctx, this.pos);
    this.render(ctx, this.pos.add(mirrors.leftMirror));
    this.render(ctx, this.pos.add(mirrors.rightMirror));
    this.render(ctx, this.pos.add(mirrors.bothMirror));
  };

  MovingObject.prototype.render = function(ctx, coord, options) {
    var innerRadius = this.radius;

    if (this.outlineColor && this.outlineSize) {
      ctx.fillStyle = this.outlineColor;
      ctx.beginPath();
      ctx.arc(
        coord.x - window.Asteroids.gameview.game.BUFF,
        coord.y - window.Asteroids.gameview.game.BUFF,
        this.radius,
        0,
        2 * Math.PI,
        false
      );
      innerRadius -= (this.outlineSize * 2);
    }

    ctx.fill();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      coord.x - window.Asteroids.gameview.game.BUFF,
      coord.y - window.Asteroids.gameview.game.BUFF,
      innerRadius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    if (this.maximumVelocity) {
      if (this.vel.norm() > this.maximumVelocity){
        this.vel = this.vel.withMag(this.maximumVelocity);
      }
    }
    if (this.minimumVelocity) {
      if (this.vel.norm() < this.minimumVelocity){
        this.vel = this.vel.withMag(this.minimumVelocity);
      }
    }

    return this.pos = this.pos.add(this.vel);
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var internalCollision = this.pos.dist(otherObject.pos) < this.radius + otherObject.radius;
    if (internalCollision) return true;
    var mirrorCollision = [[this, otherObject], [otherObject, this]].some( function(bodys) {
      var bodyOne = bodys[0];
      var bodyTwo = bodys[1];

      var mirrorCollision = [mirrors.leftMirror, mirrors.rightMirror, mirrors.bothMirror].some( function(mirror) {
        return (bodyOne.pos.add(mirror).dist(bodyTwo.pos) < bodyOne.radius + bodyTwo.radius);
      });
      return mirrorCollision;
    });

    return mirrorCollision;
  }

})();
