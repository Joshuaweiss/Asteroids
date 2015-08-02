# Asteroids

[Play Game][game_link]

[game_link]: http://joshuaweiss.github.io/Asteroids/

Asteroids is my take on the classic arcade space shooter game. Once the game is started you can move around the screen with the arrow keys and shoot with the spacebar. Bigger asteroids will split into smaller ones until eventually the smaller red asteroids are destroyed. Destroy as many asteroids as possible to increase your score. Keep in mind that the smaller an Asteroid is, the more points you will receive.

# Overview
Asteroids is a space shooter created from the ground up using JavaScript and HTML5 Canvas. Two particularly interesting features to develop were elastic collisions and partial object wrapping. Elastic collisions allow objects to ricochet differently depending on their mass, velocity, and point of impact. Partial object wrapping allows objects to be seen leaving one side of the screen while simultaneously emerging from the other. Implementing partial object wrapping alongside elastic collisions was particularly difficult because objects must rebound correctly regardless of what side a partially wrapped object is impacted.



# Libraries / Technologies

* JavaScript
* Keymaster
* HTML5 (Canvas)


# Features

* Asteroids partially wrap
* Asteroids perform elastic collisions
* Ship always spawns at a minimum distance from any asteroid


# Future Todos

* Add powerups
* Add highscore board
