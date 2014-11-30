// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function() {
	var a = Crafty.e('PlayerCharacter').at(5,5);
  a.shift(10,10);

  this.numKilled = 0;
  this.funA = this.bind("EnterFrame",function(e){
    if(e.frame%(Math.max(Game.spawnDelay-this.numKilled,10)) == 0){
      var y = Math.random()*(Game.height()-Game.shooterHeight) + Game.shooterHeight/2;
      var x = Game.width()-Game.shooterWidth*2;
      Crafty.e("Enemy").at(x,y);
    }
  });
  this.funB = this.bind("EnemyKilled",function(e){
    this.numKilled++;
  });

  // Pause scene
  // -----------
  // Handles pausing the game
  var text = Crafty.e('Pause');
  this.bind('KeyDown', function(i) {
      if(i.key === Crafty.keys.P) {
          if (!Crafty.isPaused()) {
              text.draw();
              //Crafty.e('Pause').css({'display': 'block'});
          } else text.hide();
               
          Crafty.trigger('NewEntity', Crafty.pause());
      }
  });

  Crafty.e('Wall').at(10,-Game.shooterHeight);
  Crafty.e('Wall').at(10,Game.height());
}, function() {
  this.unbind("EnterFrame",this.funA);
  this.unbind("EnemyKilled",this.funB);
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
      knock:    ['assets/door_knock_3x.mp3', 'assets/door_knock_3x.ogg'],
      applause: ['assets/board_room_applause.mp3', 'assets/board_room_applause.ogg'],
      ring:     ['assets/candy_dish_lid.mp3', 'assets/candy_dish_lid.ogg']
    });
    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  });
});