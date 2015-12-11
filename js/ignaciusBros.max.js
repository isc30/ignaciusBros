/* 

    IGNACIUS BROS (09/10/2015)

    Eres libre de cambiar, copiar o hacer lo que te de la gana con el código.

    Code by:
    
        Ivan Sanz Carasa
        ivansanzcarasa@gmail.com
        Github: https://github.com/isc30
        
*/

var trucos = true; // No seais malos, niños

var fps = 60;
var mainInterval;
var mainTimer;
var deltaTime;

var points = 0;
var gameTimer;
var gameEndTimer;

var canvasObj;
var ctx;

// Start Music
var music = new Audio('sound/music.mp3');
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
music.play();
var volume = 'full';

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Volume Controls
function VolumeControls() {
    
    var that = this;
    
    that.icon = new Sprite('sprites/volume/volumeFull.png');
    
    preloadImages([
        'sprites/volume/volumeFull.png',
        'sprites/volume/volumeNoMusic.png',
        'sprites/volume/volumeMute.png'
    ]);
    
    that.onClick = function() {
        
        changeVolume();
        
    };
    
    that.render = function(ctx) {
        
        that.icon.render(ctx, {'x': canvasObj.width - that.icon.img.width - 15, 'y': canvasObj.height - that.icon.img.height - 15});
        
    };
    
}
var volumeControls = new VolumeControls();

function changeVolume() {
    
    if (volume == 'full') {
        
        volume = 'noMusic';

        music.pause();
        music.currentTime = 0;
        
        volumeControls.icon = new Sprite('sprites/volume/volumeNoMusic.png');
        
    } else if (volume == 'noMusic') {
        
        volume = 'mute';
        
        music.pause();
        music.currentTime = 0;
        
        volumeControls.icon = new Sprite('sprites/volume/volumeMute.png');
        
    } else if (volume == 'mute') {
        
        volume = 'full';
        
        music.play();
        
        volumeControls.icon = new Sprite('sprites/volume/volumeFull.png');
        
    }
    
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
// Window Events

var keyStates = new Array();

window.addEventListener('load', init, false);

function onClick(event) {
    
    canvasObj.focus();
    
    var position = getClickPosition(event);
    event.preventDefault();
    
    if (position.x <= canvasObj.width - 10 && position.x >= canvasObj.width - 42 &&
        position.y <= canvasObj.height - 10 && position.y >= canvasObj.height - 42) {
        
        volumeControls.onClick();
        
    }
    
    return false;
    
}

function getClickPosition(event) {
    
    var rect = canvasObj.getBoundingClientRect();
    
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
        
}

function onKeyDown(e) {
    
    e.preventDefault();
    keyStates[e.keyCode] = true;
    
    // Refresh
    if (e.keyCode == 116) {
     
        location.reload();
        
    }
    
    if (trucos) {
        
        // P -> BOSS
        if (e.keyCode == 80) {
            
            player.position.x = 9130;
            player.position.y = 301;
            
        }
        
        // O -> Pinchos
        if (e.keyCode == 79) {
            
            player.position.x = 6345;
            player.position.y = 299;
            
        }
        
    }
    
    if (!player.dead) {
        
        // Allahu akbar
        if (e.keyCode == 82) {
            
            var newParticle = new Particle();
            newParticle.skin = new AnimatedSprite('sprites/particulas/explosion.png');
            newParticle.skin.frameSize.width = 32;
            newParticle.skin.frameSize.height = 32;
            newParticle.skin.loop = false;
            newParticle.position.x = player.position.x;
            newParticle.position.y = player.position.y;
            newParticle.speed.x = 0;
            newParticle.team = 'neutral';
            newParticle.lifeTime = 5;
            particles.push(newParticle);
            
            var newParticle = new Particle();
            newParticle.skin = new AnimatedSprite('sprites/particulas/explosion.png');
            newParticle.skin.frameSize.width = 32;
            newParticle.skin.frameSize.height = 32;
            newParticle.skin.loop = false;
            newParticle.position.x = player.position.x + 10;
            newParticle.position.y = player.position.y - 10;
            newParticle.speed.x = 0;
            newParticle.team = 'neutral';
            newParticle.lifeTime = 5;
            particles.push(newParticle);
            
            newParticle = new Particle();
            newParticle.skin = new AnimatedSprite('sprites/particulas/explosion.png');
            newParticle.skin.frameSize.width = 32;
            newParticle.skin.frameSize.height = 32;
            newParticle.skin.loop = false;
            newParticle.position.x = player.position.x - 15;
            newParticle.position.y = player.position.y - 20;
            newParticle.speed.x = 0;
            newParticle.team = 'neutral';
            newParticle.lifeTime = 5;
            particles.push(newParticle);
            
            newParticle = new Particle();
            newParticle.skin = new AnimatedSprite('sprites/particulas/explosion.png');
            newParticle.skin.frameSize.width = 32;
            newParticle.skin.frameSize.height = 32;
            newParticle.skin.loop = false;
            newParticle.position.x = player.position.x + 20;
            newParticle.position.y = player.position.y - 30;
            newParticle.speed.x = 0;
            newParticle.team = 'neutral';
            newParticle.lifeTime = 5;
            particles.push(newParticle);
            
            newParticle = new Particle();
            newParticle.skin = new AnimatedSprite('sprites/particulas/explosion.png');
            newParticle.skin.frameSize.width = 32;
            newParticle.skin.frameSize.height = 32;
            newParticle.skin.loop = false;
            newParticle.position.x = player.position.x;
            newParticle.position.y = player.position.y - 30;
            newParticle.speed.x = 0;
            newParticle.team = 'neutral';
            newParticle.lifeTime = 5;
            particles.push(newParticle);
            
            if (volume != 'mute') {
                var audio = new Audio('sound/suicide.mp3');
                audio.play();
            }
            
            player.die();
            
        }
        
        // Jump
        if (e.keyCode == 32 || e.keyCode == 87) {
            
            player.jump(deltaTime);
            
        }
        
        // Attack
        if (e.keyCode == 37) {
            
            var lastMovement = player.movement;
            player.movement = 'left';
            if (lastMovement == 'right') player.speed.x = 0;
            player.attack(deltaTime);
            
        }
        
        if (e.keyCode == 39) {
            
            var lastMovement = player.movement;
            player.movement = 'right';
            if (lastMovement == 'left') player.speed.x = 0;
            player.attack(deltaTime);
            
        }
        
    }
    
}

function onKeyUp(e) {
    
    e.preventDefault();
    keyStates[e.keyCode] = false;
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Utils
function preloadImages(imageList) {
    
    var images = new Array();
    
    for (var i = 0; i < imageList.length; i++) {
		images[i] = new Image();
		images[i].src = imageList[i];
	}
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Final Boss
function SQLBoss() {
    
    var that = this;
    
    that.active = false;
    that.dead = false;
    that.enrage = false;
    that.attackInterval = null;
    
    that.skin = new AnimatedSprite('sprites/enemigos/sqlboss.png');
    that.skin.frameSize.width = 137;
    that.skin.frameSize.height = 142;
    that.skin.loop = false;
    
    that.position = {'x': 10125, 'y': 374};
    that.direction = 'up';
    that.speed = 80;
    that.maxLife = 30;
    
    that.activate = function() {
        
        if (that.active) return;
        
        that.active = true;
        
        that.skin = new AnimatedSprite('sprites/enemigos/sqlboss.png');
        that.skin.frameSize.width = 137;
        that.skin.frameSize.height = 142;
        that.skin.loop = false;
        
        that.enrage = false;
        enemies = new Array(); // Clear other enemies
        
        that.position = {'x': 10125, 'y': 374};
        that.direction = 'up';
        that.speed = 80;
        that.life = that.maxLife;
        that.attacking = false;
        
        clearInterval(that.attackInterval);
        that.attackInterval = setInterval(that.attack, Math.floor(Math.random() * 2000) + 1500);
        
        // Preload images
        preloadImages([
            'sprites/enemigos/sqlboss.png',
            'sprites/enemigos/sqlboss_enrage.png',
            'sprites/enemigos/sqlboss_dead.png'
        ]);
        
    };
    
    that.goEnrage = function() {
        
        that.speed = 130;
        that.skin = new AnimatedSprite('sprites/enemigos/sqlboss_enrage.png');
        that.skin.frameSize.width = 137;
        that.skin.frameSize.height = 142;
        that.skin.loop = false;
        
        if (volume != 'mute') {
            var audio = new Audio('sound/bossEnrage.mp3');
            audio.play();
        }

    };
    
    that.die = function() {
        
        that.active = false;
        that.dead = true;
        that.enrage = false;
        
        that.skin = new AnimatedSprite('sprites/enemigos/sqlboss_dead.png');
        that.skin.frameSize.width = 137;
        that.skin.frameSize.height = 142;
        that.skin.loop = false;
        
        enemies = new Array();
        
        gameEndTimer = new Date();
        
        clearInterval(that.attackInterval);
        
        if (volume != 'mute') {
            var audio = new Audio('sound/bossDie.mp3');
            audio.play();
        }
        
    };
    
    that.attack = function() {
        
        if (!that.active || that.dead) return;
        
        that.shoot(that.enrage ? 5 : 3, player.position.y);
        
    };
    
    that.shoot = function(ammount, y) {
        
        if (ammount <= 0) {
            
            that.attacking = false;
            clearInterval(that.attackInterval);
            that.attackInterval = setInterval(that.attack, Math.floor(Math.random() * 2000) + 1500);
            return;
            
        } else {
        
            that.attacking = true;
            
        }
            
        var particle = new Particle();
        particle.skin = new AnimatedSprite('sprites/particulas/pk.png');
        particle.skin.frameSize.width = 32;
        particle.skin.frameSize.height = 32;
        particle.skin.loop = true;
        particle.position.x = that.position.x;
        particle.position.y = (ammount % 2 == 0) ? y : that.position.y;
        particle.speed.x = -10;
        particle.team = 'enemy';
        particles.push(particle);
        
        setTimeout(function(){ that.shoot(ammount - 1, player.position.y); }, that.enrage ? 75 : 250);
        
    };
    
    that.update = function(deltaTime) {
        
        that.skin.update(deltaTime);
        
        if(!that.dead) {
            
            if (player.position.x > terrain.size() - 1025) {
                if (!that.active) {
                    that.activate();
                    that.active = true;
                }
            } else {
                that.active = false;
                that.enrage = false;
            }
            
            if (!that.active) return;
            
            if (that.direction == 'up') {
                
                that.position.y -= that.speed * deltaTime;
                
            } else {
                
                that.position.y += that.speed * deltaTime;
                
            }
            
        }
        
    };
    
    that.emulate = function(deltaTime) {
        
        if (that.dead) {
            
            if (that.position.y < 374) {
                
                that.position.y += 300 * deltaTime;
                if (that.position.y > 374) that.position.y = 374;
                
            }
            
            return;
                
        }
        
        if (!that.active) return;
        
        // Collision
        if (that.position.y <= 150) {
            
            that.direction = 'down';
            that.position.y = 150;
            
        } else if (that.position.y >= 374) {
            
            that.direction = 'up';
            that.position.y = 374;
            
        }
        
        ////////////////////////////
        // Glasses
        for (var i = 0; i < particles.length; i++) {
            
            var particle = particles[i];
            if (!particle.alive || particle.team != 'friend') continue;
            
            if (particle.position.x >= that.position.x - that.skin.img.width / 2 && particle.position.x <= that.position.x + that.skin.img.width / 2) {
                
                if (particle.position.y >= that.position.y - that.skin.img.height && particle.position.y <= that.position.y) {
                 
                    particle.alive = false;
                    that.life--;
                    
                    var newParticle = new Particle();
                    newParticle.skin = new AnimatedSprite('sprites/particulas/explosion.png');
                    newParticle.skin.frameSize.width = 32;
                    newParticle.skin.frameSize.height = 32;
                    newParticle.skin.loop = false;
                    newParticle.position.x = particle.position.x;
                    newParticle.position.y = particle.position.y;
                    newParticle.speed.x = 0;
                    newParticle.team = 'neutral';
                    newParticle.lifeTime = 0.1;
                    particles.push(newParticle);
                    
                    if (volume != 'mute') {
                        var audio = new Audio('sound/bossDamage' + Math.floor(Math.random() * 4) + '.mp3');
                        audio.play();
                    }
                    
                    // Respawn bicho
                    if (enemies.length == 0) {
            
                        var enemy = new Enemy();
                        enemy.setType(Math.floor(Math.random() * 4));
                        enemy.position = {'x': 9275, 'y': 374};
                        enemy.speed.x = 125;
                        enemies.push(enemy);
                        
                    }
                    
                }
                
            }
            
        }
        
        if (!that.enrage && that.life / that.maxLife * 100 <= 34) {
            
            that.enrage = true;
            that.goEnrage();
            
        } else if (that.life <= 0) {
            
            that.die();
            
        }
        
    };
    
    that.render = function(ctx) {
        
        // Barra de vida
        if (!that.dead) {
            
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillRect(that.position.x - that.skin.img.width / 2, that.position.y - that.skin.img.height - 10, that.skin.img.width, 6);
            ctx.fillStyle = "rgb(0, 255, 0)";
            ctx.fillRect(that.position.x - that.skin.img.width / 2, that.position.y - that.skin.img.height - 10, that.skin.img.width / that.maxLife * that.life, 6);
            
        }
        
        that.skin.render(ctx, that.position);
        
    };
    
}
var sqlBoss = new SQLBoss();

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Enemy
function Enemy() {
    
    var that = this;
    
    that.life = 4;
    
    that.position = {'x': 0, 'y': 0};
    that.lastPosition = {'x': 0, 'y': 0};
    that.movement = parseInt(Math.random() * 2, 10) ? 'left' : 'right';
    
    that.speed = {'x': Math.floor(Math.random() * 50) + 150, 'y': 0};
    that.skin = null;
    
    that.move = function(deltaTime) {
        
        if (that.movement == 'left') {
            
            that.moveLeft(deltaTime);
            
        } else {
            
            that.moveRight(deltaTime);
            
        }
        
    };
    
    that.moveLeft = function(deltaTime) {

        that.position.x -= that.speed.x * deltaTime;
        
    };
    
    that.moveRight = function(deltaTime) {
        
        that.position.x += that.speed.x * deltaTime;
        
    };
    
    that.setType = function(type) {
        
        that.skin = new AnimatedSprite('sprites/enemigos/' + type + '.png');
        that.skin.loop = false;
        
    };
    
    that.update = function(deltaTime) {
        
        that.skin.update(deltaTime);
        that.move(deltaTime);
        
    };
    
    that.render = function(ctx) {
        
        that.skin.render(ctx, that.position);
        
        that.lastPosition.x = that.position.x;
        that.lastPosition.y = that.position.y;
        
    };
    
    that.die = function() {
        
        that.life = 0;
        
        if (volume != 'mute') {
            var audio = new Audio('sound/enemyDie.mp3');
            audio.play();
        }
        
        points += 100;
        
    };
    
    that.emulate = function(deltaTime) {
        
        var collisionData = terrain.getCollisionData(that.position.x, that.position.y);
        var horizontalCollision = terrain.getCollision(collisionData, that.position.x, that.position.y - 2);
        
        if (horizontalCollision != false) {
            
            that.position.x = that.lastPosition.x;
            
            if (that.movement == 'left') that.movement = 'right';
            else that.movement = 'left';
            
            
        }
        
        var verticalCollision = terrain.getCollision(collisionData, that.position.x, that.position.y + 2);
        if (verticalCollision == false) {
            
            that.position.x = that.lastPosition.x;
            
            if (that.movement == 'left') that.movement = 'right';
            else that.movement = 'left';
            
        }
        
        // Out of bounds
        if (that.position.y > 500) that.die();
        if (that.position.x < 0) that.die();
        
        ///////////////////////
        // Glasses
        for (var i = 0; i < particles.length; i++) {
            
            var particle = particles[i];
            if (!particle.alive || particle.team != 'friend') continue;
            
            if (particle.position.x >= that.position.x - 32 && particle.position.x <= that.position.x + 32) {
                
                if (particle.position.y >= that.position.y - 64 && particle.position.y <= that.position.y + 15) {
                 
                    particle.alive = false;
                    that.life--;
                    
                    var newParticle = new Particle();
                    newParticle.skin = new AnimatedSprite('sprites/particulas/explosion.png');
                    newParticle.skin.frameSize.width = 32;
                    newParticle.skin.frameSize.height = 32;
                    newParticle.skin.loop = false;
                    newParticle.position.x = particle.position.x;
                    newParticle.position.y = particle.position.y;
                    newParticle.speed.x = 0;
                    newParticle.team = 'neutral';
                    newParticle.lifeTime = 0.1;
                    particles.push(newParticle);
                    
                    if (volume != 'mute') {
                        var audio = new Audio('sound/enemyDamage.mp3');
                        audio.play();
                    }
                    
                }
                
            }
            
        }
        
        /////////////////////
        // Player
        if (that.life > 0)
        if (player.position.x + 28 >= that.position.x - 32 && player.position.x - 28 <= that.position.x + 32) {
                
            if (player.position.y >= that.position.y - 64 && player.position.y <= that.position.y + 1) {
                
                // Collision
                
                if (player.lastPosition.y <= that.position.y - 64) {
                    
                    that.life -= 2;
                    player.onAir = false;
                    player.position.y = that.position.y - 60; // Efecto profundo
                    player.jump(deltaTime, false); // No jump sound
                    
                    points += 50;
                    
                    if (volume != 'mute') {
                        var audio = new Audio('sound/enemyDamage.mp3');
                        audio.play();
                    }
                    
                } else {
             
                    player.die();
                    
                }
                
            }
            
        }
        
    };
    
}
var enemies = new Array();

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Game Restart Function
function restartGame() {
    
    enemies = new Array();
    particles = new Array();
    
    //1
    var enemy = new Enemy();
    enemy.setType(2);
    enemy.position = {'x': 750, 'y': 372};
    enemies.push(enemy);
    //2
    enemy = new Enemy();
    enemy.setType(0);
    enemy.position = {'x': 981, 'y': 300};
    enemies.push(enemy);
    //3
    enemy = new Enemy();
    enemy.setType(1);
    enemy.position = {'x': 1893, 'y': 372};
    enemies.push(enemy);
    //4
    enemy = new Enemy();
    enemy.setType(3);
    enemy.position = {'x': 1262, 'y': 372};
    enemies.push(enemy);
    //5
    // Nice
    enemy = new Enemy();
    enemy.setType(1);
    enemy.position = {'x': 1893, 'y': 372};
    enemies.push(enemy);
    //6
    enemy = new Enemy();
    enemy.setType(2);
    enemy.position = {'x': 2704, 'y': 372};
    enemies.push(enemy);
    //7
    enemy = new Enemy();
    enemy.setType(0);
    enemy.position = {'x': 4000, 'y': 372};
    enemies.push(enemy);
    //8
    enemy = new Enemy();
    enemy.setType(3);
    enemy.position = {'x': 3700, 'y': 372};
    enemies.push(enemy);
    //9
    enemy = new Enemy();
    enemy.setType(1);
    enemy.position = {'x': 4730, 'y': 372};
    enemies.push(enemy);
    //10
    enemy = new Enemy();
    enemy.setType(2);
    enemy.position = {'x': 4816, 'y': 156};
    enemies.push(enemy);
    //11
    enemy = new Enemy();
    enemy.setType(1);
    enemy.position = {'x': 5480, 'y': 372};
    enemies.push(enemy);
    //12
    enemy = new Enemy();
    enemy.setType(0);
    enemy.position = {'x': 6152, 'y': 372};
    enemies.push(enemy);
    //13
    enemy = new Enemy();
    enemy.setType(3);
    enemy.position = {'x': 6966, 'y': 380};
    enemies.push(enemy);
    //14
    enemy = new Enemy();
    enemy.setType(0);
    enemy.position = {'x': 8160, 'y': 373};
    enemies.push(enemy);
    
    for (var i = 0; i < 4; i++) {
        enemy = new Enemy();
        enemy.setType(i);
        enemy.position = {'x': 8600 + i * 100, 'y': 373};
        enemies.push(enemy);
    }
    
    points = 0;
    
    gameTimer = new Date();
    
    player.position.x = startPosition.x;
    player.position.y = startPosition.y;
    player.dead = false;
    player.changeAnimation('idleRight');
    player.movement = 'right';
    
    sqlBoss.dead = false;
    sqlBoss.active = false;
    sqlBoss.enrage = false;
    clearInterval(sqlBoss.attackInterval);
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Particle
function Particle() {
    
    var that = this;
    
    that.position = {'x': 0, 'y': 0};
    that.lastPosition ={'x': 0, 'y': 0};
    that.speed = {'x': 0, 'y': 0};
    
    that.team = 'neutral';
    
    that.alive = true;
    that.lifeTime = 2;
    that.currentTime = 0;
    
    that.skin = null;
    
    that.update = function(deltaTime) {
        
        that.currentTime += deltaTime;
        
        that.skin.update(deltaTime);
        
        if (that.currentTime >= that.lifeTime) {
            
            that.alive = false;
            
        } else {
            
            that.position.x += that.speed.x * deltaTime * 60;
            that.position.y += that.speed.y * deltaTime * 60;
            
        }
        
    };
    
    that.emulate = function(deltaTime) {
        
        // Out of bounds
        if (that.position.x < -that.skin.img.width) {
            
            that.alive = false;
            
        } else if (that.position.x > terrain.size() + that.skin.img.width) {
            
            that.alive = false;
            
        }
        
        // Terrain
        var collisionData = terrain.getCollisionData(that.position.x, that.position.y - 16);
        var horizontalCollision = terrain.getCollision(collisionData, that.position.x, that.position.y - 16 - that.speed.y * deltaTime * 60 - 1);
        
        if (horizontalCollision != false) {
            
            that.alive = false;
            
            // Sound
            if (that.team == 'friend') {
                
                if (volume != 'mute') {
                    var audio = new Audio('sound/glassesBreak.mp3');
                    audio.play();
                }
                
            }
                
        }
        
        if (that.team == 'enemy') {
            
            // Test vs Player
            
            if (that.position.x >= player.position.x - 32 && that.position.x <= player.position.x + 32) {
                
                if (that.position.y >= player.position.y - 48 && that.position.y <= player.position.y + 16) {
                 
                    that.alive = false;
                    player.die();
                    
                }
                
            }
            
        }
        
    };
    
    that.render = function(ctx) {
        
        if(that.alive) {
            
            that.skin.render(ctx, that.position);
            
        }
        
        that.lastPosition.x = that.position.x;
        that.lastPosition.y = that.position.y;
        
    };
    
}
var particles = [];
var clouds = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Player
var startPosition = {'x': 50, 'y': 370};
function Player() {
    
    var that = this;
    
    that.position = {'x': 0, 'y': 0};
    that.lastPosition = {'x': 0, 'y': 0};
    that.movement = 'none';
    
    that.dead = false;
    
    that.speed = {'x': 0, 'y': 0};
    that.onAir = false;
    that.attacking = false;
    that.attackingTime = null;
    
    that.animations = {};
    that.currentAnimation;
    
    that.attack = function(deltaTime) {
        
        if (that.attacking == false) {
            
            that.attacking = true;
            that.attackingTime = new Date();
            
            var newGlasses = new Particle();
            newGlasses.skin = new AnimatedSprite('sprites/particulas/gafas.png');
            newGlasses.skin.frameDuration = 0.1;
            newGlasses.skin.frameSize.width = 32;
            newGlasses.skin.frameSize.height = 32;
            newGlasses.skin.loop = true;
            newGlasses.position.x = that.position.x;
            newGlasses.position.y = that.position.y - 10;
            newGlasses.team = 'friend';
            
            if (that.movement == 'left') {
                
                newGlasses.speed.x = -10;
                
                that.changeAnimation('attackLeft');
                
            } else {
                
                newGlasses.speed.x = 10;
                
                that.changeAnimation('attackRight');
                
            }
            
            particles.push(newGlasses);
            
            // Sound
            if (volume != 'mute') {
                var audio = new Audio('sound/ignaciusAttack.mp3');
                audio.play();
            }
            
       }
        
    };
    
    that.jump = function(deltaTime, sound) {
        
        // Default = true
        sound = typeof sound !== 'undefined' ? sound : true;
        
        if (!that.onAir && !that.dead) {
            
            that.speed.y = -15;
        
            if (that.movement == 'right') that.changeAnimation('jumpRight');
            else that.changeAnimation('jumpLeft');
            
            that.onAir = true;
            
            // Sound
            if (volume != 'mute' && sound) {
                var audio = new Audio('sound/ignaciusJump.mp3');
                audio.volume = 0.5;
                audio.play();
            }
            
        }
        
    };
    
    that.moveRight = function(deltaTime) {
        
        if(!that.attacking) {
            if (!that.onAir) that.changeAnimation('walkRight');
            else that.changeAnimation('jumpRight');
        }
        
        that.speed.x += 10 * deltaTime;
        if (that.speed.x > 5) that.speed.x = 5;
        that.position.x += 100 * deltaTime;
        that.movement = 'right';
        
    };
    
    that.moveLeft = function(deltaTime) {
        
        if(!that.attacking) {
            if (!that.onAir) that.changeAnimation('walkLeft');
            else that.changeAnimation('jumpLeft');
        }
        
        that.speed.x -= 10 * deltaTime;
        if (that.speed.x < -5) that.speed.x = -5;
        that.position.x -= 100 * deltaTime;
        that.movement = 'left';
        
    };
    
    that.changeAnimation = function(animation) {
        
        if (that.currentAnimation != that.animations[animation]) {
            
            that.currentAnimation = that.animations[animation];
            that.currentAnimation.frameIndex = 0;
            
        }
        
    };
    
    that.update = function(deltaTime) {
        
        that.currentAnimation.update(deltaTime);
        
        if (that.dead) return;
        
        // Gravedad
        that.speed.y += 49 * deltaTime;
        that.position.y += that.speed.y * deltaTime * 60;
        that.position.x += that.speed.x * deltaTime * 60;
        
        if (that.attacking && (new Date() - that.attackingTime) / 1000 > 0.33) {
            that.attacking = false;
        }
        
    };
    
    that.render = function(ctx) {
        
        that.currentAnimation.render(ctx, that.position);
        
        that.lastPosition.x = that.position.x;
        that.lastPosition.y = that.position.y;
        
    };
    
    that.die = function() {
        
        if (that.dead) return;
        
        that.dead = true;
        that.speed.x = 0;
        that.speed.y = 0;
        that.attacking = false;
        that.onAir = true;
        
        if (that.currentAnimation == that.animations['walkLeft']) {
            
            that.changeAnimation('idleLeft');
            
        } else if (that.currentAnimation == that.animations['walkRight']) {
            
            that.changeAnimation('idleRight');
            
        }
        
        if (that.position.y < 512) {
            
            if (volume != 'mute') {
                var audio = new Audio('sound/ignaciusDie.mp3');
                audio.play();
            }
            
            setTimeout(function () {
                restartGame();
            }, 1750);
            
        } else {
            
            restartGame();
            
        }
        
    };
    
    that.emulate = function(deltaTime) {
        
        if (that.dead) return;
        
        var collisionData = terrain.getCollisionData(that.position.x, that.position.y);
        var horizontalCollision = terrain.getCollision(collisionData, that.position.x, that.position.y - that.speed.y * deltaTime * 60 - 1);
        
        if (horizontalCollision == 'collision') {
            
            that.position.x = that.lastPosition.x;
            that.speed.x = 0;
            
        } else if (horizontalCollision == 'die') {
            
            that.die();
            
        }
        
        // Head
        var verticalCollision = terrain.getCollision(collisionData, that.position.x, that.position.y - 50);
        while (verticalCollision != false) {
            
            if (verticalCollision == 'die') that.die();
            
            that.position.y++;
            that.speed.y = 0;
            that.onAir = true;
            
            verticalCollision = terrain.getCollision(collisionData, that.position.x, that.position.y - 50);
            
        }
        
        verticalCollision = terrain.getCollision(collisionData, that.position.x, that.position.y);
        while (verticalCollision != false) {
            
            if (verticalCollision == 'die') that.die();
            
            that.position.y--;
            that.speed.y = 0;
            that.onAir = false;
            
            verticalCollision = terrain.getCollision(collisionData, that.position.x, that.position.y);
            
        }
        
        // Out of bounds
        if (that.position.y > 500) that.die();
        if (that.position.x < 0) that.die();
        
        if (that.position.x > terrain.size()) that.die();
        
    };
    
}
var player = new Player();

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Sprite
function Sprite(imgUrl) {
    
    var that = this;
    
    that.isLoaded = false;
    
    that.img = new Image();
    that.img.onload = function() { that.isLoaded = true; };
    that.img.src = imgUrl;
    
    that.render = function(ctx, position) {
        
        if (that.isLoaded) {
            
            ctx.drawImage(that.img, position.x, position.y);
            
        }
        
    };
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Animated Sprite
function AnimatedSprite(imgUrl) {
    
    var that = this;

    that.frameSize = {'width': 64, 'height': 64};
    that.isLoaded = false;
    
    that.img = new Image();
    that.img.onload = function() { that.isLoaded = true; };
    that.img.src = imgUrl;
    
    that.frameIndex = 0;
    that.frameDuration = 0.25; //s
    that.frameTime = 0;
    that.loop = true;
    that.nextAnimation = null;
    
    that.update = function(deltaTime) {
        
        that.frameTime += deltaTime;
        
        while (that.frameTime >= that.frameDuration) {
            
            that.frameIndex++;
            
            if(that.frameIndex > Math.floor(that.img.width / that.frameSize.width, 10) - 1) {
                
                if(that.loop == true) {
                    
                    that.frameIndex = 0;
                    
                } else {
                    
                    if (that.nextAnimation != null) { player.changeAnimation(that.nextAnimation); }
                    
                    that.frameIndex = Math.floor(that.img.width / that.frameSize.width, 10) - 1;
                    
                }
                
            }
            
            that.frameTime -= that.frameDuration;
            
        }
        
    };
    
    that.render = function(ctx, position) {
        
        if (that.isLoaded)
            ctx.drawImage(that.img, that.frameSize.width * that.frameIndex, 0, that.frameSize.width, that.frameSize.height, Math.round(position.x - that.frameSize.width / 2), Math.round(position.y - that.frameSize.height), that.frameSize.width, that.frameSize.height);
        
    };
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Pixel functions
function getImageData(image) {
    
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    
    return context.getImageData(0, 0, image.width, image.height);

}

function getPixel(imagedata, x, y) {

    var position = ( Math.round(x) + imagedata.width * Math.round(y) ) * 4;
    var data = imagedata.data;
    return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };

}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Terrain
function Terrain(pieces) {
    
    var that = this;
    
    that.sections = new Array();
    for (var i = 0; i < pieces.length; i++) {
        
        var drawable = new Sprite(pieces[i].drawable);
        var collision = new Sprite(pieces[i].collision);
        
        that.sections.push({'drawable': drawable, 'collision': collision, 'collisionData': null});
        
    }
    
    that.addTerrain = function(piece) {
        
        var drawable = new Sprite(piece.drawable);
        var collision = new Sprite(piece.collision);
        
        that.sections.push({'drawable': drawable, 'collision': collision, 'collisionData': null});
        
    };
    
    that.size = function() {
        
        var total = 0;
        
        for (var i = 0; i < that.sections.length; i++) {
            
            total += that.sections[i].drawable.img.width;
            
        }
        
        return total;
        
    };
    
    that.render = function(ctx) {
        
        var left = 0;
        
        for (var i = 0; i < that.sections.length; i++) {
            
            ctx.drawImage(that.sections[i].drawable.img, left, 0, that.sections[i].drawable.img.width, that.sections[i].drawable.img.height);
            left += that.sections[i].drawable.img.width;
            
        }
        
    };
    
    that.getCollisionData = function(x, y) {
        
        var left = 0;
        var index = 0;
        for (var i = 0; i < that.sections.length; i++) {
            
            index = i;
            
            if (x >= left && x < left + that.sections[i].collision.img.width) {
                break;
            }
            
            left += that.sections[i].collision.img.width;
            
        }
        
        if (that.sections[index].collision.isLoaded) {
            
            if (that.sections[index].collisionData == null) {
                
                that.sections[index].collisionData = getImageData(that.sections[index].collision.img);
                
            }
            
            return {'index': index, 'data': that.sections[index].collisionData};
            
        } else {
            
            return getImageData(that.sections[index].collision.img);
            
        }
      
    };
    
    that.getCollision = function(collisionData, x, y) {
        
        var pixel = getPixel(collisionData.data, x, y - collisionData.index); // Anoying pixel bug :O
        
        if (pixel.b > 200) {
            
            return 'collision';
            
        }
        
        if (pixel.r > 200) {
            
            return 'die';
            
        }
        
        return false;
        
    };
    
}
var terrain = new Terrain([{'drawable': 'sprites/map/1_1.png', 'collision': 'sprites/map/1_1A.png'},
                           {'drawable': 'sprites/map/1_2.png', 'collision': 'sprites/map/1_2A.png'},
                           {'drawable': 'sprites/map/1_3.png', 'collision': 'sprites/map/1_3A.png'},
                           {'drawable': 'sprites/map/1_4.png', 'collision': 'sprites/map/1_4A.png'},
                           {'drawable': 'sprites/map/1_5.png', 'collision': 'sprites/map/1_5A.png'}]);

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Main
function init() {

    canvasObj = document.getElementById('game');
    canvasObj.width = canvasObj.clientWidth;
    canvasObj.height = canvasObj.clientHeight;
    
    canvasObj.setAttribute('tabindex','0');
    canvasObj.focus();
    
    canvasObj.addEventListener("mousedown", onClick, false);
    canvasObj.addEventListener('keydown', onKeyDown, false);
    canvasObj.addEventListener('keyup', onKeyUp, false);
    
    ctx = canvasObj.getContext("2d");
    ctx.imageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.mozImageSmoothingEnabled = false;
    
    player.position.x = startPosition.x;
    player.position.y = startPosition.y;
    
    player.animations['walkLeft'] = new AnimatedSprite('sprites/ignacius/walkLeft.png');
    player.animations['walkLeft'].frameDuration = 0.25;
    
    player.animations['walkRight'] = new AnimatedSprite('sprites/ignacius/walkRight.png');
    player.animations['walkRight'].frameDuration = 0.25;
    
    player.animations['idleLeft'] = new AnimatedSprite('sprites/ignacius/idleLeft.png');
    player.animations['idleLeft'].frameDuration = 0.5;
    
    player.animations['idleRight'] = new AnimatedSprite('sprites/ignacius/idleRight.png');
    player.animations['idleRight'].frameDuration = 0.5;
    
    player.animations['jumpLeft'] = new AnimatedSprite('sprites/ignacius/jumpLeft.png');
    player.animations['jumpLeft'].frameDuration = 0.1;
    player.animations['jumpLeft'].loop = false;
    
    player.animations['jumpRight'] = new AnimatedSprite('sprites/ignacius/jumpRight.png');
    player.animations['jumpRight'].frameDuration = 0.1;
    player.animations['jumpRight'].loop = false;
    
    player.animations['attackRight'] = new AnimatedSprite('sprites/ignacius/attackRight.png');
    player.animations['attackRight'].frameDuration = 1;
    player.animations['attackRight'].loop = false;
    player.animations['attackRight'].nextAnimation = 'idleRight';
    
    player.animations['attackLeft'] = new AnimatedSprite('sprites/ignacius/attackLeft.png');
    player.animations['attackLeft'].frameDuration = 1;
    player.animations['attackLeft'].loop = false;
    player.animations['attackLeft'].nextAnimation = 'idleLeft';
    
    player.changeAnimation('idleRight');
    player.movement = 'right';
    
    //////////////////////////////////////
    // Preload particles + enemies
    preloadImages([
        'sprites/enemigos/0.png',
        'sprites/enemigos/1.png',
        'sprites/enemigos/2.png',
        'sprites/enemigos/3.png',
        'sprites/particulas/explosion.png',
        'sprites/particulas/gafas.png',
        'sprites/particulas/nube.png',
        'sprites/particulas/pk.png'
    ]);
    
    mainTimer = new Date();
    
    // Start Game
    var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

    if (animFrame !== null) {

        var recursiveAnim = function() {
            processGame();
            animFrame(recursiveAnim, canvasObj);
        };

        animFrame(recursiveAnim, canvasObj);
        
    } else {
        
        clearInterval(mainInterval);
        mainInterval = setInterval(processGame, 1000 / fps);
        
    }
    
    restartGame();
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Game Loop
function processGame() {
    
    deltaTime = (new Date() - mainTimer) / 1000;
    mainTimer = new Date();
    
    player.update(deltaTime);
    
    for (var i = 0; i < enemies.length; i++)
        enemies[i].update(deltaTime);
        
    sqlBoss.update(deltaTime);
    
    for (var i = 0; i < particles.length; i++)
        particles[i].update(deltaTime);
        
    for (var i = 0; i < clouds.length; i++)
        clouds[i].update(deltaTime);
    
    ////////////////////////////
    // Keyboard
    
    if (!player.dead) {
    
        if (keyStates[65]) {
            
            player.moveLeft(deltaTime);
            
        } else if (keyStates[68]) {
            
            player.moveRight(deltaTime);
            
        } else if (!player.onAir) {
            
            if (player.movement == 'right') {
                
                if (player.speed.x > 0) player.speed.x -= 100 * deltaTime;
                if (player.speed.x < 0) player.speed.x = 0;
                
                if(!player.attacking) {
                    player.changeAnimation('idleRight');
                }
                
            } else {
                
                if (player.speed.x < 0) player.speed.x += 100 * deltaTime;
                if (player.speed.x > 0) player.speed.x = 0;
                
                if(!player.attacking) {
                    player.changeAnimation('idleLeft');
                }
                
            }
            
        }
        
    }
    
    /////////////////////////////
    // Collisions
    player.emulate(deltaTime);
    sqlBoss.emulate(deltaTime);
    
    for (var i = 0; i < enemies.length; i++)
        enemies[i].emulate(deltaTime);
    
    for (var i = 0; i < particles.length; i++)
        particles[i].emulate(deltaTime);
    
    // Delete extra particles
    for (var i = 0; i < particles.length; i++)
        if (!particles[i].alive) {
            particles.splice(i, 1);
        }
        
    // Delete extra enemies
    for (var i = 0; i < enemies.length; i++)
        if (enemies[i].life <= 0) {
            enemies[i].die();
            enemies.splice(i, 1);
        }
    
    // Render
    renderGame();
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Camera
function Camera(){}
Camera.lookAt = function(ctx, x, y) {
    ctx.translate(-x + canvasObj.width / 2, y); // Begin Camera
};
Camera.clear = function() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Render Functions
function renderGame() {
    
    var skyColor = ctx.createLinearGradient(0, 0, 0, canvasObj.height);
    if (sqlBoss.enrage) {
        skyColor.addColorStop(0, 'rgb(224, 53, 56)');
    } else {
        skyColor.addColorStop(0, 'rgb(117, 237, 250)');
    }
    skyColor.addColorStop(1, 'white');
    
    // Clear canvas image
    ctx.fillStyle = skyColor;
    ctx.fillRect(0, 0, canvasObj.width, canvasObj.height);
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillRect(0, 0, canvasObj.width, canvasObj.height);
    
    Camera.lookAt(ctx, player.position.x, 0);
    
    if (player.position.x < canvasObj.width / 2) {
        Camera.clear();
        Camera.lookAt(ctx, canvasObj.width / 2, 0);
    } else if (player.position.x > terrain.size() - 1025) {
        Camera.clear();
        Camera.lookAt(ctx, terrain.size() - canvasObj.width / 2, 0);
    }
    
    ctx.globalAlpha = 0.75;
    for (var i = 0; i < clouds.length; i++)
        clouds[i].render(ctx);
    ctx.globalAlpha = 1;
    
    terrain.render(ctx);
    
    player.render(ctx);
    
    for (var i = 0; i < enemies.length; i++)
        enemies[i].render(ctx);
    
    for (var i = 0; i < particles.length; i++)
        particles[i].render(ctx);
        
    sqlBoss.render(ctx);
    
    Camera.clear(ctx); // End Camera
    
    renderFps(ctx);
    renderScore(ctx);
    volumeControls.render(ctx);
    
    if (player.dead) {
        
        ctx.textBaseline = 'center';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FF0000';
        ctx.font = '42pt Arial';
        ctx.fillText('NOOOB', canvasObj.width / 2, canvasObj.height / 4);
        
    }
    
}

function renderScore(ctx) {
    
    if (!sqlBoss.dead) {
        
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#000000';
        ctx.font = '24px Arial';
        ctx.fillText('Puntos: ' + points, 15, 10);
        
        ctx.textBaseline = 'top';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.font = '32px Arial';
        ctx.fillText(Math.round((new Date() - gameTimer) / 1000) + 's', canvasObj.width - 15, 10);
        
    } else {
        
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        ctx.font = '42px Arial';
        ctx.fillText('Puntos: ' + points, canvasObj.width / 2, canvasObj.height / 2 - 75);
        
        ctx.textBaseline = 'center';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        ctx.font = '42px Arial';
        ctx.fillText('Tiempo: ' + Math.round((gameEndTimer - gameTimer) / 1000) + 's', canvasObj.width / 2, canvasObj.height / 2 - 25);
        
        ctx.textBaseline = 'bottom';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#007700';
        ctx.font = '42px Arial';
        ctx.fillText('WINRAAAR !!!', canvasObj.width / 2, canvasObj.height / 2 + 75);
        
    }
    
}

function renderFps(ctx) {
    
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    ctx.fillText(Math.floor(1 / deltaTime) + ' fps', canvasObj.width / 2, 10);
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Clouds

var cloudInterval;

function createCloudLoop() {
    
    var cloud = new Particle();
    cloud.skin = new AnimatedSprite('sprites/particulas/nube.png');
    cloud.skin.frameSize = {'width': 192, 'height': 92};
    cloud.skin.loop = false;
    cloud.team = 'neutral';
    cloud.lifeTime = 999; // WTF xD
    cloud.position = {'x': terrain.size() + 192, 'y': Math.floor(Math.random() * 150) + 90};
    cloud.speed.x = -1.5 * (Math.floor(Math.random() * 5) + 6) / 10;
    
    clouds.push(cloud);
    
    clearInterval(cloudInterval);
    cloudInterval = setInterval(function() {
        createCloudLoop();
    }, Math.floor(Math.random() * 4000) + 4000);
    
}

function createClouds() {
    
    clouds = new Array();
    
    for (var i = 0; i < 2048 * 3; i += Math.floor(Math.random() * 750) + 400) {
        
        var cloud = new Particle();
        cloud.skin = new AnimatedSprite('sprites/particulas/nube.png');
        cloud.skin.frameSize = {'width': 192, 'height': 92};
        cloud.skin.loop = false;
        cloud.team = 'neutral';
        cloud.lifeTime = 999; // WTF xD
        cloud.position = {'x': i, 'y': Math.floor(Math.random() * 150) + 90};
        cloud.speed.x = -1.5 * (Math.floor(Math.random() * 5) + 6) / 10;
        clouds.push(cloud);
        
    }
    
    setTimeout(function () {
        createCloudLoop();
    }, 4000);
    
}

createClouds();