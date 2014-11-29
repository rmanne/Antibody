Crafty.c("Unit",{
  init: function(){
    this.requires('2D, Canvas, Collision');
  },

  at: function(x,y){
    this.attr({x: x, y: y});
    return this;
  },

  resize: function(w,h){
    this.attr({w: w, h: h});
    return this;
  }
});

Crafty.c("PlayerCharacter",{
  init: function(){
    this.requires("Unit, Fourway, spr_player")
      .fourway(2)
      .onHit('Enemy', this.enemy)
      .onHit('Powerup', this.powerup);
    //to add: collide with powerups, enemies, shooting
    this.health = 100;
  },
  enemy: function(data) {
    var enemy  = data[0].obj;
    if (this.health > 10) {
      this.health = this.health - 10;
    } else {
      this.health = 0;
      alert("You're dead!");
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
    this.requires("Unit, spr_player")
      // .stopOnSolids()
      .onHit('PlayerCharacter', this.dispose) 
      .bind("EnterFrame",this.act);   
  },
  dispose: function(data) {
    this.destroy();
  },
  act: function(){
    this.move("w",Game.enemySpeed);
  }
});

Crafty.c("Powerup",{
  init: function(){
    this.requires("Unit, spr_village");
  }
  //to add: collide with player, time limit
});

Crafty.c("Bullet",{
  init: function(){
    this.requires('Unit, spr_rock')
      .bind("EnterFrame", this.act);
  },

  act: function(){  
    this.move("e",Game.bulletSpeed);
  }

});