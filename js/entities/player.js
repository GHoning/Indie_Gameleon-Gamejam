game.player = me.ObjectEntity.extend({
		init : function (x, y, settings) {
			this.parent(x, y, settings);
			this.settings = settings;
			me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
			this.setMaxVelocity(256, 128);
			this.setFriction(0, 0);
			this.gravity = false;
			this.alwaysUpdate = false;
			
			this.maxMapWidth = me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).cols;
			this.maxMapHeight = me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).rows;
			
			this.type = me.game.world.PLAYER;
			
			this.shapes[0].height = 32;
			this.shapes[0].width = 64;
			this.shapes[0].pos = new me.Vector2d(16,128-32);
			
			this.mapPos = new me.Vector2d(124,124);
			this.keylock = false;
			
			this.renderable = new me.AnimationSheet(0, 0, me.loader.getImage("alex"), 128, 128);
			this.renderable.addAnimation("roll",[0,1,2,3,4,5,6]);
			this.renderable.setCurrentAnimation("roll");
			
			this.tunnel = false;

			this.animate = false;
			this.index = 0;
			this.deltaTime = 0;
		},
		
		animator : function() { 
			this.deltaTime = this.deltaTime + me.timer.tick;
			
			if(this.deltaTime >= 2){
			
				this.renderable.setAnimationFrame(this.index);
				this.index++;
			
				if(this.index >= 7) {
					this.renderable.setAnimationFrame(this.index);
					this.index = 0;
					this.deltaTime = 0;
					
					return true;
				}
				
				this.deltaTime = 0;
			}
		},
		
		animates : function() { 
			
			this.deltaTime = this.deltaTime + me.timer.tick;
			
			if(this.deltaTime >= 7) {
				this.keylock = false;
			}
			
			if(this.deltaTime >= 7){
			
				this.renderable.setAnimationFrame(this.index);
				this.index++;
			
				if(this.index >= 5) {
					this.index = 0;
					this.renderable.setAnimationFrame(this.index);
					this.deltaTime = 0;
					this.animate = false;
				}
				
				this.deltaTime = 0;
			}
		},
		
		walkUp : function () {
			this.flipX(false);
			this.mapPos.y -= 1;
			this.pos.x += 64;
			this.pos.y -= 32;
			this.animate = true;
		},
		
		walkLeft : function () {
			this.flipX(false);
			this.mapPos.x -=1;
			this.pos.x -= 64;
			this.pos.y -= 32;
			this.animate = true;
		},
		
		walkRight : function () {
			this.flipX(true);
			this.mapPos.x +=1;
			this.pos.x += 64;
			this.pos.y += 32;
			this.animate = true;
		},
		
		walkDown : function () {
			this.flipX(true);
			this.mapPos.y += 1;
			this.pos.x -= 64;
			this.pos.y += 32;
			this.animate = true;
		},
		
		update : function () {
		
			if(game.play.collisionMap[this.mapPos.x][this.mapPos.y] != null) {
			
				console.log(game.play.collisionMap[this.mapPos.x][this.mapPos.y].tileId);
				if(game.play.collisionMap[this.mapPos.x][this.mapPos.y].tileId == constants.DEATHPOINT_TILEID){
					
					//TODO play animation of player dying. than place grave on tile. changetile ID too none
					this.renderable = new me.AnimationSheet(0, 0, me.loader.getImage("die"), 128, 128);
					this.renderable.addAnimation("death",[0,1,2,3,4,5,6,7]);
					this.renderable.setCurrentAnimation("death");
					
					if(this.animator()){
						game.data.deathCounter += 1;
						console.log("deathpool " + game.data.deathCounter);
						me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).alpha = 0;
						game.data.graves.push(this.pos);
						game.play.loadLevel(me.game.currentLevel.name);
					}
					
				}else if(game.play.collisionMap[this.mapPos.x][this.mapPos.y].tileId == constants.TRIGGER_TILEID && me.input.isKeyPressed("Interact") && game.data.deathCounter > 0) {
					//TODO
					//game.play.loadLevel("test2", this.pos, this.mapPos);
				}else if(game.play.collisionMap[this.mapPos.x][this.mapPos.y].tileId == constants.TUNNEL_TILEID) {
					//TODO
					this.tunnel = true;
				}
			} else {
				this.tunnel = false;
			}

			
			if(this.tunnel) {
				me.game.currentLevel.getLayerByName("bridgesAbove").alpha = 1;
			} else {
				me.game.currentLevel.getLayerByName("bridgesAbove").alpha = 0;
			}
			
			if (me.input.isKeyPressed("Up") && !this.keylock) {
				this.keylock = true;
				if(this.mapPos.y-1 >= 0 && game.play.collisionMap[this.mapPos.x][this.mapPos.y-1] != null){
					if (game.play.collisionMap[this.mapPos.x][this.mapPos.y-1].tileId == constants.COLLISION_TILEID) {
						this.keylock = false;
					} else {
						this.walkUp();
					}
				} else {
					this.walkUp();
				}
			}

			if (me.input.isKeyPressed("Left") && !this.keylock) {
				this.keylock = true;
				if(this.mapPos.x-1 >= 0 && game.play.collisionMap[this.mapPos.x-1][this.mapPos.y] != null){
					if(game.play.collisionMap[this.mapPos.x-1][this.mapPos.y].tileId == constants.COLLISION_TILEID){
						this.keylock = false;
					} else {
						this.walkLeft();
					}
				} else {
					this.walkLeft();
				}
			}

			if (me.input.isKeyPressed("Down") && !this.keylock) {
				this.keylock = true;
				if(this.mapPos.y < this.maxMapWidth -1 && game.play.collisionMap[this.mapPos.x][this.mapPos.y+1] != null) {
					if(game.play.collisionMap[this.mapPos.x][this.mapPos.y+1].tileId == constants.COLLISION_TILEID){
						this.keylock = false;
					} else {
						this.walkDown();
					}
				} else {
					this.walkDown();
				}
			}

			if (me.input.isKeyPressed("Right") && !this.keylock) {
				this.keylock = true;
				if(this.mapPos.x < this.maxMapWidth -1 && game.play.collisionMap[this.mapPos.x+1][this.mapPos.y] != null){
					if(game.play.collisionMap[this.mapPos.x+1][this.mapPos.y].tileId == constants.COLLISION_TILEID) {
						this.keylock = false;
					} else {
						this.walkRight();
					}
				} else {
					this.walkRight();
				}
			}
			
			if(this.animate){
				this.animates();
			}
			
			this.updateMovement();

			this.parent();
			return true;
		}
	});