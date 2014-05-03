game.player = me.ObjectEntity.extend({
		init : function (x, y, settings) {
			this.parent(x, y, settings);
			this.settings = settings;
			me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
			this.setMaxVelocity(256, 128);
			this.setFriction(0, 0);
			this.gravity = false;
			this.alwaysUpdate = true;
			
			this.type = me.game.world.PLAYER;
			
			this.shapes[0].height = 64;
			this.shapes[0].width = 128;
			this.shapes[0].pos = new me.Vector2d(32,256-64);
			
			console.log(this.shapes[0].height);
			console.log(this.shapes[0].width);
			console.log(this.shapes[0].pos);
			
			this.mapPos = new me.Vector2d(0,0);
			this.keylock = false;
			
			this.renderable = new me.AnimationSheet(0, 0, me.loader.getImage("alex"), 128, 256);
			this.renderable.addAnimation("downLeft",[0,1,2,3]);
			this.renderable.addAnimation("downRight",[4,5,6,7]);
			this.renderable.addAnimation("upRight",[8,9,10,11]);
			this.renderable.addAnimation("upLeft",[12,13,14,15]);
		},
		
		update : function () {
		
			if(game.play.collisionMap[this.mapPos.x][this.mapPos.y] != null) {
				console.log(game.play.collisionMap[this.mapPos.x][this.mapPos.y].tileId);
				if(game.play.collisionMap[this.mapPos.x][this.mapPos.y].tileId == constants.DEATHPOINT_TILEID){
					console.log("deathpool " + game.data.deathCounter);
					game.data.deathCounter += 1;
					me.levelDirector.reloadLevel();
				}else if(game.play.collisionMap[this.mapPos.x][this.mapPos.y].tileId == constants.TRIGGER_TILEID && me.input.isKeyPressed("Interact") && game.data.deathCounter > 0) {
					game.play.loadLevel("test2", this.pos, this.mapPos);
				}
			}
			
			if (me.input.isKeyPressed("Up") && !this.keylock) {
				console.log("please "+ this.mapPos);
				this.keylock = true;
				console.log(this.mapPos.y-1 >= 0 && game.play.collisionMap[this.mapPos.x][this.mapPos.y-1]);
				if(this.mapPos.y-1 >= 0 && game.play.collisionMap[this.mapPos.x][this.mapPos.y-1] == null){
					console.log("Up");
					this.renderable.setCurrentAnimation("upRight");
					/*this.pos.x += 128;
					this.pos.y -= 64;*/
					this.mapPos.y -= 1;
					var tween = new me.Tween(this.pos).to({x: this.pos.x + 128, y: this.pos.y -64}, 1000);
					tween.easing(me.Tween.Easing.Bounce.Out);
					tween.start();
				} else if(this.mapPos.y-1 >= 0 && game.play.collisionMap[this.mapPos.x][this.mapPos.y-1].tileId == constants.DEATHPOINT_TILEID){
					console.log("Up");
					this.renderable.setCurrentAnimation("upRight");
					this.pos.x += 128;
					this.pos.y -= 64;
					this.mapPos.y -= 1;
				} else if(this.mapPos.y-1 >= 0 && game.play.collisionMap[this.mapPos.x][this.mapPos.y-1].tileId == constants.TRIGGER_TILEID){
					console.log("Up");
					this.renderable.setCurrentAnimation("upRight");
					this.pos.x += 128;
					this.pos.y -= 64;
					this.mapPos.y -= 1;
				}
			}

			if (me.input.isKeyPressed("Left") && !this.keylock) {
				this.keylock = true;
				console.log(this.mapPos.x-1 >= 0 && game.play.collisionMap[this.mapPos.x-1][this.mapPos.y]);
				if(this.mapPos.x-1 >= 0 && game.play.collisionMap[this.mapPos.x-1][this.mapPos.y] == null){
					console.log("Left");
					this.renderable.setCurrentAnimation("upLeft");
					this.pos.x -= 128;
					this.pos.y -= 64;
					this.mapPos.x -=1;
				} else if(this.mapPos.x-1 >= 0 && game.play.collisionMap[this.mapPos.x-1][this.mapPos.y].tileId == constants.DEATHPOINT_TILEID){
					console.log("Left");
					this.renderable.setCurrentAnimation("upLeft");
					this.pos.x -= 128;
					this.pos.y -= 64;
					this.mapPos.x -=1;
				} else if(this.mapPos.x-1 >= 0 && game.play.collisionMap[this.mapPos.x-1][this.mapPos.y].tileId == constants.TRIGGER_TILEID) {
					console.log("Left");
					this.renderable.setCurrentAnimation("upLeft");
					this.pos.x -= 128;
					this.pos.y -= 64;
					this.mapPos.x -=1;
				}
			}

			if (me.input.isKeyPressed("Down") && !this.keylock) {
				this.keylock = true;
				console.log(this.mapPos.y < 29 && game.play.collisionMap[this.mapPos.x][this.mapPos.y+1]);
				if(this.mapPos.y < 29 && game.play.collisionMap[this.mapPos.x][this.mapPos.y+1] == null){
					console.log("Down");
					this.renderable.setCurrentAnimation("downLeft");
					this.pos.x -= 128;
					this.pos.y += 64;
					this.mapPos.y += 1;
				} else if(this.mapPos.y < 29 && game.play.collisionMap[this.mapPos.x][this.mapPos.y+1].tileId == constants.DEATHPOINT_TILEID) {
					console.log("Down");
					this.renderable.setCurrentAnimation("downLeft");
					this.pos.x -= 128;
					this.pos.y += 64;
					this.mapPos.y += 1;
				} else if(this.mapPos.y < 29 && game.play.collisionMap[this.mapPos.x][this.mapPos.y+1].tileId == constants.TRIGGER_TILEID) {
					console.log("Down");
					this.renderable.setCurrentAnimation("downLeft");
					this.pos.x -= 128;
					this.pos.y += 64;
					this.mapPos.y += 1;
				}
			}

			if (me.input.isKeyPressed("Right") && !this.keylock) {
				this.keylock = true;
				console.log(this.mapPos.x < 29 && game.play.collisionMap[this.mapPos.x+1][this.mapPos.y]);
				if(this.mapPos.x < 29 && game.play.collisionMap[this.mapPos.x+1][this.mapPos.y] == null){
					console.log("Right");
					this.renderable.setCurrentAnimation("downRight");
					this.pos.x += 128;
					this.pos.y += 64;
					this.mapPos.x +=1;
				} else if(this.mapPos.x < 29 && game.play.collisionMap[this.mapPos.x+1][this.mapPos.y].tileId == constants.DEATHPOINT_TILEID) {
					console.log("Right");
					this.renderable.setCurrentAnimation("downRight");
					this.pos.x += 128;
					this.pos.y += 64;
					this.mapPos.x +=1;
				} else if(this.mapPos.x < 29 && game.play.collisionMap[this.mapPos.x+1][this.mapPos.y].tileId == constants.TRIGGER_TILEID) {
					console.log("Right");
					this.renderable.setCurrentAnimation("downRight");
					this.pos.x += 128;
					this.pos.y += 64;
					this.mapPos.x +=1;
				}
			}
			
			if(!me.input.isKeyPressed("Down")&&!me.input.isKeyPressed("Right")&&!me.input.isKeyPressed("Left")&&!me.input.isKeyPressed("Up")){
				this.keylock = false;
			}
			
			this.updateMovement();
			this.parent();
			return true;
		},
	});