(function(){

  var Game = window.Asteroids.Game;

  var GameView = window.Asteroids.GameView = function(ctx) {
    this.game = new Game();
    this.ctx = ctx;
  }

  GameView.prototype.bindKeyHandlers = function () {

    setInterval(function(){
      if (key.isPressed("up")) {
        this.game.ship.power(new Coordinate(0, 1))
      }
      if (key.isPressed("down")) {
        this.game.ship.power(new Coordinate(0, -1))
      }
      if (key.isPressed("left")) {
        this.game.ship.power(new Coordinate(-1, 0))
      }
      if (key.isPressed("right")) {
        this.game.ship.power(new Coordinate(1, 0))
      }
    },1000/50);

  }


  GameView.prototype.start = function() {
    setInterval(function(){
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this),1000/50);
  };

})();
