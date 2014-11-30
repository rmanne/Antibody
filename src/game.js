Game = {
  walkingSpeed: 10,
  bulletSpeed: 6,
  spawnDelay: 120,
  shooterWidth: 32,
  shooterHeight: 32,
  shootingDelay: 25,
  barHeight: 54,
  totalHealth: 100,
  height: 600,
  width: document.body.clientWidth*.97,

  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.width, Game.height);
    Crafty.background('url("assets/background.jpg") rgb(255, 192, 203)');
    // Simply start the "Loading" scene to get things going
    Crafty.scene('Loading');
  }
};

$text_css = { 'size': '24px', 'family': 'Arial', 'color': 'red',
              'text-align': 'center' };