(function(){
  "use strict";

  var Game = window.Asteroids.Game;
  var Coordinate = window.Asteroids.Coordinate;


  var GameView = window.Asteroids.GameView = function(ctx) {
    this.ctx = ctx;
    this.game = new Game();
    this.menu = false;
  }

  GameView.prototype.bindKeyHandlers = function () {
    var POWER = 0.40;

    if (!this.menu){
      key('space', function(){
        this.game.ship.fireBullet();
      }.bind(this));

      setInterval(function(){
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
      }.bind(this),1000/50);
    };
  }

  GameView.prototype.mainMenu = function(){
    this.game = new Game(true);
    setInterval(function(){
      if (key.isPressed("space")) {
        this.start();
      }
    }.bind(this),1000/50);
  };

  GameView.prototype.start = function() {
    this.bindKeyHandlers();
    setInterval(function(){
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this),1000/50);
  };

})();
