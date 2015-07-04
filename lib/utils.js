window.Asteroids = {};
window.Asteroids.utils = {};

(function() {
  "use strict";

  var Coordinate = window.Asteroids.Coordinate = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Coordinate.prototype.dist = function(otherCoord) {
    return Math.sqrt(Math.pow((this.x - otherCoord.x), 2)  + Math.pow((this.y - otherCoord.y), 2));
  };

  Coordinate.prototype.norm = function() {
    return this.dist(new Coordinate(0,0));
  };

  Coordinate.prototype.add = function(otherCoord) {
    return new Coordinate(this.x + otherCoord.x, this.y + otherCoord.y);
  };

  Coordinate.prototype.diff = function(otherCoord) {
    return new Coordinate(this.x - otherCoord.x, this.y - otherCoord.y);
  };

  Coordinate.prototype.adv = function(otherCoord) {
    return new Coordinate((this.x + otherCoord.x)/2, (this.y + otherCoord.y) / 2);
  };

  Coordinate.prototype.random = function(maxX, maxY) {
    return new Coordinate( Math.floor(100000 * Math.random()) % maxX, Math.floor(100000 * Math.random()) % maxY);
  };

  Coordinate.prototype.rotate = function(ang) {
    return new Coordinate(this.x * Math.cos(ang) - (this.y * Math.sin(ang)), this.x * Math.sin(ang) + (this.y * Math.cos(ang)) );
  }

  Coordinate.prototype.wrap = function(maxX, maxY) {
    this.x = (this.x < 0 ? maxX + this.x : this.x);
    this.y = (this.y < 0 ? maxY + this.y : this.y);

    this.x = this.x % maxX;
    this.y = this.y % maxY;
  }

  Coordinate.prototype.multiplier = function (mult) {
    return new Coordinate(this.x * mult, this.y * mult);
  }

  Coordinate.prototype.slope = function () {
    return this.y / this.x;
  }

  Coordinate.prototype.withMag = function (mag) {
    var y = (mag / Math.sqrt(Math.pow(this.x / this.y, 2) + 1));
    var x = (mag /  Math.sqrt(Math.pow(this.y / this.x, 2) + 1));
    x = (this.x < 0 ? x * -1 : x * 1);
    y = (this.y < 0 ? y * -1 : y * 1);

    return (new Coordinate(x, y));
  }

})();


(function() {
  Asteroids.utils.randomColor = function() {
    return "rgb(" + Math.floor(Math.random() * 1000 % 255) + "," + Math.floor(Math.random() * 1000 % 255) + "," + Math.floor(Math.random() * 1000 % 255) + ")";
  };
})();

(function() {
  "use strict";

  Function.prototype.inherits = function(parentClass) {
   var Surrogate = function() {};
   Surrogate.prototype = parentClass.prototype;
   this.prototype = new Surrogate();
  };
})();


(function() {
  "use strict";

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
