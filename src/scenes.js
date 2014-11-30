// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function() {
  Crafty.e('Wall').at(10,Game.barHeight-Game.shooterHeight);
  Crafty.e('Wall').at(10,Game.height);
  
  var player = Crafty.e('PlayerCharacter')
    .at(20,Game.height/2)
    .resize(Game.shooterWidth,Game.shooterHeight);
  var bar = Crafty.e("Container");
  var bar = Crafty.e("Bar").color("rgb(255,255,255)").health(player.health);

  this.enemySpeed = 2;
  this.numKilled = 0;
  this.funA = this.bind("EnterFrame",function(e){
    if(e.frame%(Math.max(Game.spawnDelay-this.numKilled*3,30)) == 0){
      var y = Math.random()*(Game.height-Game.shooterHeight-Game.barHeight)
              + Game.barHeight;
      var x = Game.width-Game.shooterWidth*2;
      Crafty.e("Enemy").at(x,y)
        .resize(Game.shooterWidth,Game.shooterHeight)
        .setSpeed(this.enemySpeed);
    }
    if(e.frame%(Game.spawnDelay*1.5) == 0){
      var y = Math.random()*(Game.height-Game.shooterHeight-Game.barHeight)
              + Game.barHeight;
      var x = Game.width-Game.shooterWidth*2;
      Crafty.e("Powerup").at(x,y);
    }

  });
  this.funB = this.bind("EnemyKilled",function(e){
    this.numKilled++;
    bar.update(this.numKilled);
    if(this.numKilled%10==0)
      this.enemySpeed++;
    if (this.numKilled < 13 * 3 && this.numKilled % 3 == 0)
      player.shootDelay--;
  });

  // Pause scene
  // -----------
  // Handles pausing the game
  var text = Crafty.e('Pause');
  this.funC = this.bind('KeyDown', function(e) {
      if(e.key === Crafty.keys.P) {
          if (!Crafty.isPaused()) {
              text.draw();
              //Crafty.e('Pause').css({'display': 'block'});
          } else text.hide();
               
          Crafty.trigger('NewEntity', Crafty.pause());
      }
      // if (e.key == Crafty.keys.Z)
        // player.shoot();
  });

  this.funD = this.bind('HealthLost', function(){
    bar.health(player.health);
  });

}, function() {
  this.unbind("EnterFrame",this.funA);
  this.unbind("EnemyKilled",this.funB);
  this.unbind("KeyDown",this.funC);
  this.unbind("HealthLost",this.funD);
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
  Crafty.e('2D, DOM, Image')
    .image('assets/loading.png')
    .attr({ x: 70, y: Game.height/2 - 60, w: Game.width });

  // console.log(Crafty.support.audio);

  // Load our sprite map image
  Crafty.load({
    'audio': [
      'assets/wind_god_girl.mp3'
    ],

    "images": [    
     'assets/16x16_forest_2.gif',
     'assets/player.png',
    ],
  }

    , function(){
    // Once the images are loaded...

    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
    Crafty.sprite(32, 'assets/flu.png', {
      spr_bush:    [0, 0]
    });
    
    Crafty.sprite(16, 'assets/pill.png', {
      spr_pill:    [0, 0]
    });
    
    Crafty.sprite(24, 'assets/syringe.png', {
      spr_rock:    [0, 0]
    });

    // Define the PC's sprite to be the first sprite in the third row of the
    //  animation sprite map
    Crafty.sprite(32, 'assets/player.png', {
      spr_player:  [0, 0]
    });

    // Define our sounds for later use
    Crafty.audio.add({
      music:    ['assets/wind_god_girl.mp3']
    });
    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  });
});