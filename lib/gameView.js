(function(){
  "use strict";

  var Game = window.Asteroids.Game;
  var Coordinate = window.Asteroids.Coordinate;


  var GameView = window.Asteroids.GameView = function(ctx) {
    this.ctx = ctx;
    this.game = new Game({
      gameview: this,
      background: true
    });
    this.menu = true;
    this.showscore = false;
    this.bindKeyHandlers(this.ctx);
    key("space",function() {
      if (this.menu) {
        this.menu = false;
        this.showscore = true;
        this.game = new Game({gameview: this});
      }
    }.bind(this));
  }

  GameView.prototype.bindKeyHandlers = function () {
    var POWER = 0.40;

    key('space', function(){
      if (!this.menu) this.game.ship.fireBullet();
    }.bind(this));



    setInterval(function(){
      if (this.game.ship) {
        if (key.isPressed("up")) {
          this.game.ship.power(new Coordinate(0, -POWER));
        }
        if (key.isPressed("down")) {
          this.game.ship.power(new Coordinate(0, POWER));
        }
        if (key.isPressed("left")) {
          this.game.ship.power(new Coordinate(-POWER, 0));
        }
        if (key.isPressed("right")) {
          this.game.ship.power(new Coordinate(POWER, 0));
        }
      }
    }.bind(this),1000/50);
  }

  GameView.prototype.drawMainMenu = function(ctx){

    ctx.fillStyle = "rgba(255, 255, 255, 0.93)";
    ctx.fillRect(0, 0, this.game.DIM_X, this.game.DIM_Y);

    ctx.textAlign = 'center';

    ctx.fillStyle = "rgb(42, 42, 42)";
    ctx.font = "100 90px Lato";
    ctx.fillText("Asteroids", this.game.DIM_X * 0.5, this.game.DIM_Y * 0.2);

    if (this.showscore) {

      ctx.font = "100 28px Lato";
      ctx.fillText("Your Score Was", this.game.DIM_X * 0.5, this.game.DIM_Y * 0.38);

      ctx.font = "100 80px Lato";
      ctx.fillText(this.game.score, this.game.DIM_X * 0.5, this.game.DIM_Y * 0.55);

    }

    ctx.font = "100 30px Lato";
    ctx.fillText("Press Space To Begin", this.game.DIM_X * 0.5, this.game.DIM_Y * 0.87);

  };

  GameView.prototype.start = function() {
    setInterval(function(){
      this.game.step();
      this.game.draw(this.ctx);
      if (this.menu) this.drawMainMenu(this.ctx);
    }.bind(this),1000/50);
  };

})();
