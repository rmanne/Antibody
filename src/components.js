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
      .fourway(2)
      .stopOnSolids()
      .onHit('Enemy', this.hit)
      .onHit('Powerup', this.powerup);
    //to add: collide with powerups, enemies, shooting
    this.attr("health", 100);
  },
  hit: function(data) {
    var enemy  = data[0].obj;
    var health = this.attr("health");
    if (health > 10) {
      this.attr("health", health - 10);
    } else {
      this.attr("health", 0);
      // TODO: die please
    }
    enemy.destroy(); // TODO: decide whether we will do anything about the enemy
  },
  powerup: function(data) {
    var powerobj = data[0].obj;
    // TODO: patrick, what do we do with a powerup
    powerobj.destroy();
  }
});

Crafty.c("Enemy",{
  init: function(){
    this.requires("Shooter, spr_tree")
      .stopOnSolids();
  }
});

Crafty.c("Powerup",{
  init: function(){
    this.requires("Unit, spr_village");
  }
  //to add: collide with player, time limit
});