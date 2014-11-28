Crafty.c("Unit",{
  init: function(){
    this.requires('2D, Canvas, Collision');
  },

  at: function(x,y){
    this.attr({x: x, y: y});
  },

  resize: function(w,h){
    this.attr({w: w, h: h});
  }
});

Crafty.c("Shooter",{
  init: function(){
    this.requires('Unit, Solid');
  }
});

Crafty.c("PlayerCharacter",{
  init: function(){
    this.requires("Shooter, Fourway, spr_player")
      .fourway(2);
    //to add: collide with powerups, enemies, bullets, shooting
  }
});

Crafty.c("Enemy",{
  init: function(){
    this.requires("Shooter");
    //to add: collide with player, bullets
  }
});

Crafty.c("Powerup",{
  init: function(){
    this.requires("Unit, Solid");
  }
  //to add: collide with player, time limit
});