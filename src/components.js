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
    this.requires("Unit, Multiway, spr_player")
      .multiway(Game.walkingSpeed, {UP_ARROW: -90, DOWN_ARROW: 90})
      .onHit('Enemy', this.enemy)
      .onHit('Wall', this.wall)
      .onHit('Powerup', this.powerup);
    //to add: collide with powerups, enemies, shooting
    this.health = 100;
  },
  wall: function(data) {
    if (this.y > 0) {
      this.y = 540 - 16;
    } else {
      this.y = 0;
    }
  },
  enemy_custom: function(data) {
    if (this.health > 10) {
      this.health = this.health - 10;
    } else {
      this.health = 0;
      alert("You're dead!");
      // TODO: die please
    }
    data.destroy(); // TODO: decide whether we will do anything about the enemy
  },
  enemy: function(data) {
    var enemy = data[0].obj;
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
    this.requires("Unit, spr_bush")
      .bind("EnterFrame",this.act);   
    var rand = Math.random();
    if(rand < .4) this.speed = Game.enemySpeed1;
    else if(rand < .8) this.speed = Game.enemySpeed2;
    else this.speed=Game.enemySpeed3;
  },
  act: function(){
    if (this.x < 0) {
      Crafty("PlayerCharacter").enemy_custom(this);
    }

    this.move("w",this.speed);
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

Crafty.c("Wall",{
  init: function() {
    this.requires('Unit, spr_player');
  }
});