(var Coordinate = window.Asteroids.utils.Coordinate = function(x, y) {
  this.x = x;
  this.y = y;
};


Coordinate.prototype.dist = function(otherCoord){
  return Math.sqrt(Math.pow((this.x - otherCoord.x), 2)  + Math.pow((this.y - otherCoord.y), 2));
};

Coordinate.prototype.norm = function(){
  return this.dist(new Coordinate(0,0));
};

Coordinate.prototype.add = function(otherCoord){
  return new Coordinate(this.x + otherCoord.x, this.y + otherCoord.y);
};

Coordinate.prototype.random = function(){
  return new Coorindate( Math.floor(1000*Math.random() ), Math.floor(1000*Math.random()) );
};
)();


(Function.prototype.inherits = function(parentClass) {
   var Surrogate = function() {};
   Surrogate.prototype = parentClass.prototype;
   this.prototype = new Surrogate();
};
)();


//
// c1 = new Coordinate(0,0);
// c2 = new Coordinate(12,5);
//
// console.log(c2.norm());
