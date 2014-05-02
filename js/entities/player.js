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
		
			if (me.input.isKeyPressed("Talk")) {
				me.state.change(me.state.READY);
				game.data.lastSpokenPerson = "Henk";
			}
			
			if (me.input.isKeyPressed("Up") /*&& !this.keylock*/) {
				this.keylock = true;
				if(this.mapPos.y-1 >= 0 && game.play.collisionMap[this.mapPos.x][this.mapPos.y-1] == null){
					console.log("Up");
					this.renderable.setCurrentAnimation("upRight");
					this.pos.x += 128;
					this.pos.y -= 64;
					this.mapPos.y -= 1;
				}
				/*this.vel.x += this.accel.x * me.timer.tick;
				this.vel.y -= this.accel.y * me.timer.tick;*/
			}

			if (me.input.isKeyPressed("Left") /*&& !this.keylock*/) {
				this.keylock = true;
				if(this.mapPos.x-1 >= 0 && game.play.collisionMap[this.mapPos.x-1][this.mapPos.y] == null){
					console.log("Left");
					this.renderable.setCurrentAnimation("upLeft");
					this.pos.x -= 128;
					this.pos.y -= 64;
					this.mapPos.x -=1;
				}
				/*this.vel.x -= this.accel.x * me.timer.tick;
				this.vel.y -= this.accel.y * me.timer.tick;*/
			}

			if (me.input.isKeyPressed("Down") /*&& !this.keylock*/) {
				this.keylock = true;
				if(this.mapPos.y < 29 && game.play.collisionMap[this.mapPos.x][this.mapPos.y+1] == null){
					console.log("Down");
					this.renderable.setCurrentAnimation("downLeft");
					this.pos.x -= 128;
					this.pos.y += 64;
					//this.vel.x -= this.accel.x * me.timer.tick;
					//this.vel.y += this.accel.y * me.timer.tick;
					this.mapPos.y += 1;
				}
			
				/*this.vel.x -= this.accel.x * me.timer.tick;
				this.vel.y += this.accel.y * me.timer.tick;*/
			}

			if (me.input.isKeyPressed("Right") /*&& !this.keylock*/) {
				this.keylock = true;
				
				if(this.mapPos.x < 29 && game.play.collisionMap[this.mapPos.x+1][this.mapPos.y] == null){
					console.log("Right");
					this.renderable.setCurrentAnimation("downRight");
					this.pos.x += 128;
					this.pos.y += 64;
					this.mapPos.x +=1;
				}
				/*this.vel.x += this.accel.x * me.timer.tick;
				this.vel.y += this.accel.y * me.timer.tick;*/
			}
			
			/*if(!me.input.isKeyPressed("Down")&&!me.input.isKeyPressed("Right")&&!me.input.isKeyPressed("Left")&&!me.input.isKeyPressed("Up")){
				this.keylock = false;
			}*/
			
			this.updateMovement();
			this.parent();
			return true;
		},
	});