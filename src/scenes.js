// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function() {
	// var a = Crafty.e('Bullet');
  // a.at(5,5).at(10,10);

  this.numKilled = 0;
  Crafty.bind("EnterFrame",function(e){
    if(e.frame%60 == 0){
      console.log("here");
      var x1 = Math.random()*Game.width();
      var x2 = Math.random()*Game.width();
      var y1 = Math.random()*Game.height();
      var y2 = Math.random()*Game.height();
      Crafty.e("Enemy").at(x1,y1);
      Crafty.e("Enemy").at(x2,y2);
    }
  });

  Crafty.e('Wall').at(10,-16);
  Crafty.e('Wall').at(10,540);
  Crafty.e('PlayerCharacter').at(10,30);
  Crafty.e('Enemy').at(50,10);
  Crafty.e('Enemy').at(50,30);
  Crafty.e('Enemy').at(50,50);
  Crafty.e('Enemy').at(50,70);
  Crafty.e('Enemy').at(50,90);
  Crafty.e('Enemy').at(70,10);
  Crafty.e('Enemy').at(70,30);
  Crafty.e('Enemy').at(70,50);
  Crafty.e('Enemy').at(70,70);
  Crafty.e('Enemy').at(70,90);
  Crafty.e('Powerup').at(90,90);
}, function() {

});


// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('Victory', function() {

}, function() {

});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  Crafty.e('2D, DOM, Text')
    .text('Loading; please wait...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .textFont($text_css);

  // console.log(Crafty.support.audio);

  // Load our sprite map image
  Crafty.load({
    'audio': [
      'assets/door_knock_3x.mp3',
      'assets/door_knock_3x.ogg',
      // 'assets/door_knock_3x.aac',
      'assets/board_room_applause.mp3',
      'assets/board_room_applause.ogg',
      // 'assets/board_room_applause.aac',
      'assets/candy_dish_lid.mp3',
      'assets/candy_dish_lid.ogg',
      // 'assets/candy_dish_lid.aac'
    ],

    "images": [    
     'assets/16x16_forest_2.gif',
     'assets/hunter.png',
    ],
  }

    , function(){
    // Once the images are loaded...

    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
    Crafty.sprite(16, 'assets/16x16_forest_2.gif', {
      spr_tree:    [0, 0],
      spr_bush:    [1, 0],
      spr_village: [0, 1],
      spr_rock:    [1, 1]
    });

    // Define the PC's sprite to be the first sprite in the third row of the
    //  animation sprite map
    Crafty.sprite(16, 'assets/hunter.png', {
      spr_player:  [0, 2],
    }, 0, 2);

    // Define our sounds for later use
    Crafty.audio.add({
      knock:    ['assets/door_knock_3x.mp3', 'assets/door_knock_3x.ogg', 'assets/door_knock_3x.aac'],
      applause: ['assets/board_room_applause.mp3', 'assets/board_room_applause.ogg', 'assets/board_room_applause.aac'],
      ring:     ['assets/candy_dish_lid.mp3', 'assets/candy_dish_lid.ogg', 'assets/candy_dish_lid.aac']
    });
    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  });
});