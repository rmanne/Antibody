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
      .bind("EnterFrame",this.decrementCounter)
      .multiway(Game.walkingSpeed, {UP_ARROW: -90, DOWN_ARROW: 90})
      .onHit('Enemy', this.enemyShot)
      .onHit('Wall', this.wall)
      .onHit('Powerup', this.powerup);
    this.health = 100;
    this.counter = 0;
    this.power = 0;
  },
  wall: function(data) {
    if (this.y > 0) {
      this.y = Game.height() - Game.shooterHeight;
    } else {
      this.y = 0;
    }
  },
  enemyWalled: function(data) {
    if (this.health > 10) {
      this.health = this.health - 10;
    } else {
      this.health = 0;
      alert("You're dead!");
      // TODO: die please (game over)
    }
    data.destroy(); // TODO: decide whether we will do anything about the enemy
  },
  enemyShot: function(data) {
    var enemy = data[0].obj;
    if (this.health > 10) {
      this.health = this.health - 10;
    } else {
      this.health = 0;
      alert("You're dead!");
      // TODO: die please (game over)
    }
    Crafty.trigger("EnemyKilled",this);
    enemy.destroy(); // TODO: decide whether we will do anything about the enemy
  },
  powerup: function(data) {
    var powerobj = data[0].obj;

    this.power++;
    // TODO: patrick, what do we do with a powerup
    powerobj.destroy();
  },
  shoot: function() {
    if (this.counter == 0) {
      this.counter = Game.shootingDelay;
      if (this.power > 2)
        Crafty.e('WidePowerBullet').at(this.x + Game.shooterHeight, this.y);
      else if (this.power > 1)
        Crafty.e('WideBullet').at(this.x + Game.shooterHeight, this.y);
      else if (this.power > 0)
        Crafty.e('PowerBullet').at(this.x + Game.shooterHeight, this.y);
      else {
        Crafty.e('Bullet').at(this.x + Game.shooterHeight, this.y);
        this.power++;
      }
      this.power--;
    }
  },
  decrementCounter: function() {
    if (this.counter > 0)
      this.counter = this.counter - 1;
  }
});

Crafty.c("Enemy",{
  init: function(){
    this.requires("Unit, spr_bush")
      .bind("EnterFrame",this.act)
      .onHit('Bullet', this.bullet)
      .onHit('PowerBullet', this.bullete); 
    var rand = Math.random();
    if(rand < .4) this.speed = Game.enemySpeed1;
    else if(rand < .8) this.speed = Game.enemySpeed2;
    else this.speed=Game.enemySpeed3;
  },
  act: function(){
    this.move("w",this.speed);
    if (this.x < 0)
      Crafty("PlayerCharacter").enemyWalled(this);
  },
  bullet: function(data) {
    var bulletobj = data[0].obj;
    bulletobj.destroy();
    this.destroy();
  },
  bullete: function(data) {
    this.destroy();
  }
});

Crafty.c("Powerup", {
  init: function() {
    this.requires("Unit, spr_player")
      .bind("EnterFrame", this.act)
      .onHit('Bullet', this.bullet);
  },
  act: function() {
    this.move("w", Game.enemySpeed1);
    if (this.x < 0)
      this.destroy();
  },
  bullet: function(data) {
    data[0].obj.destroy();
    this.destroy();
  }
});

Crafty.c("Bullet",{
  init: function(){
    this.requires('Unit, spr_rock')
      .bind("EnterFrame", this.act);
  },
  act: function(){
    this.move("e",Game.bulletSpeed);
    if (this.x > Game.width())
      this.destroy();
  }
});

Crafty.c("PowerBullet",{
  init: function(){
    this.requires('Unit, spr_rock')
      .bind("EnterFrame", this.act);
  },
  act: function(){  
    this.move("e",Game.bulletSpeed);
    if (this.x > Game.width())
      this.destroy();
  }
});

Crafty.c("WideBullet",{
  init: function(){
    this.bullet1 = Crafty.e("Bullet");
    this.bullet2 = Crafty.e("Bullet");
    this.bullet3 = Crafty.e("Bullet");
  },
  at: function(x,y) {
    this.bullet1.at(x,y - Game.shooterHeight);
    this.bullet2.at(x,y);
    this.bullet3.at(x,y + Game.shooterHeight);
  }
});

Crafty.c("WidePowerBullet",{
  init: function(){
    this.bullet1 = Crafty.e("PowerBullet");
    this.bullet2 = Crafty.e("PowerBullet");
    this.bullet3 = Crafty.e("PowerBullet");
  },
  at: function(x,y) {
    this.bullet1.at(x,y - Game.shooterHeight);
    this.bullet2.at(x,y);
    this.bullet3.at(x,y + Game.shooterHeight);
  }
});

Crafty.c("Wall",{
  init: function() {
    this.requires('Unit, spr_player');
  }
});

Crafty.c("Pause", {
    _text: '',
    init: function(){
        this._text = Crafty.e('2D, DOM, Text')
            .setName("Pause")
            .text('Paused; press P to continue...')
            .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
            .textFont($text_css)
            .css({'display': 'none'});
    },
    draw: function(){
        this._text.css({'display': 'block'});
        this._text.draw();
    },
    hide: function(){
        this._text.css({'display': 'none'});
    }
});