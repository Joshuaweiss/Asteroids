(function(){

  var MovingObject = window.Asteroids.MovingObject
  var Coordinate = window.Asteroids.utils.Coordinate

  var Ship = window.Asteroids.Ship = function(options){
    this.color = "#ff0000";
    this.radius = 20;
    this.vel = 0;
    this.pos = options.pos;
  }

  Ship.inherits(window.Asteroids.MovingObject)

  Ship.prototype.power = function (impulse) {

    this.vel = this.vel.add(impulse)

  }


})();
