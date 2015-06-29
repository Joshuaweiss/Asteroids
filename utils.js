window.Asteroids = {};
window.Asteroids.utils = {};

(function() {
var Coordinate = window.Asteroids.utils.Coordinate = function(x, y) {
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

Coordinate.prototype.random = function(maxX, maxY){
  return new Coordinate( Math.floor(100000*Math.random() ) % maxX, Math.floor(100000*Math.random() ) % maxY);
  };
})();


(function() {
  Function.prototype.inherits = function(parentClass) {
   var Surrogate = function() {};
   Surrogate.prototype = parentClass.prototype;
   this.prototype = new Surrogate();
 };
})();

(function() {
  Object.prototype.merge = function(otherObject) {
  var bo = {};
  for (var x in this) {
    bo[x] = this[x];
  }
  for (var y in otherObject) {
    bo[y] = otherObject[y];
  }
  return bo;
  };
})();


//
// c1 = new Coordinate(0,0);
// c2 = new Coordinate(12,5);
//
// console.log(c2.norm());
