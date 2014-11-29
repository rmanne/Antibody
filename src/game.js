Game = {
  bulletSpeed: 2,
  enemySpeed: 10,

	// The total width of the game screen. 
	// This is just the width of a tile times the width of the grid
	width: function() {
    return 1080;
	},

	// The total height of the game screen. 
  // This is just the height of a tile times the height of the grid
	height: function() {
    return 540;
	},

	// Initialize and start our game
	start: function() {
		// Start crafty and set a background color so that we can see it's working
		Crafty.init(Game.width(), Game.height());
		Crafty.background('rgb(255, 192, 203)');
    // Simply start the "Loading" scene to get things going
    Crafty.scene('Loading');
	}
};

$text_css = { 'size': '24px', 'family': 'Arial', 'color': 'red',
              'text-align': 'center' };