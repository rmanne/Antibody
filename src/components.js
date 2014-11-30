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
    this.requires("Unit, Multiway, Keyboard, spr_player")
      .bind("EnterFrame",this.decrementCounter)
      .bind("EnterFrame",this.shoot)
      .multiway(Game.walkingSpeed, {UP_ARROW: -90, DOWN_ARROW: 90})
      .onHit('Enemy', this.enemyShot)
      .onHit('Wall', this.wall)
      .onHit('Powerup', this.powerup)
      .resize(Game.shooterWidth,Game.shooterHeight);
    this.health = Game.totalHealth;
    this.counter = 0;
    this.power = 0;
    this.shootDelay = Game.shootingDelay;
  },
  wall: function(data) {
    if (this.y > Game.barHeight) {
      this.y = Game.height - Game.shooterHeight;
    } else {
      this.y = Game.barHeight;
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
    Crafty.trigger("HealthLost",this);
    data.destroy();
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
    Crafty.trigger("HealthLost",this);
    enemy.destroy();
  },
  powerup: function(data) {
    this.power++;
    data[0].obj.destroy();
  },
  shoot: function() {
    if(!this.isDown("Z")) return;
    if (this.counter == 0) {
      this.counter = this.shootDelay;
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
      .onHit('PowerBullet', this.bullete)
      .resize(Game.shooterWidth,Game.shooterHeight); 
  },
  setSpeed: function(num){
    var ran = Math.random();
    if(ran < .4) this.speed = num-1;
    else if(ran < .8) this.speed = num;
    else this.speed = num+1;
  },
  act: function(){
    this.move("w",this.speed);
    if (this.x < 0)
      Crafty("PlayerCharacter").enemyWalled(this);
  },
  bullet: function(data) {
    data[0].obj.destroy();
    Crafty.trigger("EnemyKilled",this);
    this.destroy();
  },
  bullete: function(data) {
    Crafty.trigger("EnemyKilled",this);
    this.destroy();
  }
});

Crafty.c("Powerup", {
  init: function() {
    this.requires("Unit, spr_pill")
      .bind("EnterFrame", this.act)
      .onHit('Bullet', this.bullet);
  },
  act: function() {
    this.move("w", 7);
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
    if (this.x > Game.width)
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
    if (this.x > Game.width)
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
    this.requires('Unit')
      .resize(Game.shooterWidth,Game.shooterHeight);
  }
});

Crafty.c("Pause", {
    _text: '',
    init: function(){
        this._text = Crafty.e('2D, DOM, Text')
            .setName("Pause")
            .text('Paused; press P to continue...')
            .attr({ x: 0, y: Game.height/2 - 24, w: Game.width })
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

Crafty.c("Bar",{
  init: function(){
    this.requires("2D, Canvas, Color")
      .color("green")
      .attr({x: 0, y: 5, w: Game.width, h: Game.barHeight});
    this.points = Crafty.e('2D, DOM, Text')
      .text('Points: 0')
      .attr({ x: 10, y: 10, w: 100 })
      .textFont($text_css);
  },

  health: function(health){
    this.w = health/Game.totalHealth*Game.width;
    return this;
  },
  update: function(number) {
    this.points.destroy();
    this.points = Crafty.e('2D, DOM, Text')
      .text('Points: ' + (number*100))
      .attr({ x: 0, y: 5, z: 999, w: Game.width})
      .textFont($text_css);
  }

});

Crafty.c("Container",{
  init: function(){
    this.requires("2D, Canvas, Color")
      .color("rgba(255,255,255,0.7)")
      .attr({x: 0, y: 0, z: 99, w: Game.width, h: Game.barHeight + 10});
  }
});