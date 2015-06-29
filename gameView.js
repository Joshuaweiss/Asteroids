(function(){

  var Game = window.Asteroids.Game;

  var GameView = window.Asteroids.GameView = function(ctx) {
    this.game = new Game();
    this.ctx = ctx
  }

  GameView.prototype.start = function() {
    setInterval(function(){
      this.game.move();
      this.game.draw();
    },1000/50);
  };

})();
