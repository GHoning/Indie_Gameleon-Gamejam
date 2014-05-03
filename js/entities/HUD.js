/**
 * a HUD container
 */
game.HUD = game.HUD || {};

game.HUD.Container = me.ObjectContainer.extend({

		init : function () {
			this.parent();
			this.isPersistent = true;
			this.collidable = false;
			this.z = Infinity;
			this.name = "HUD";
			this.addDeaths();
		},
		
		remove :  function () {
			me.game.world.removeChild(this);
		},
		
		addDeaths : function () {
			//this.addChild(
			this.addChild(new game.HUD.Textfield(160, 51));
			this.addChild(new game.HUD.DeathSprite(0, 0, {image:"grave" ,spritewidth: 128,spriteheight: 128}));
		}
	});
	

game.HUD.DeathSprite = me.ObjectEntity.extend({
		init :  function (x, y, settings) {
			this.parent(x, y, settings);
			this.keyLock = true;
			this.floating = true;
			this.imgSprite = new me.AnimationSheet(this.pos.x, this.pos.y, me.loader.getImage("DeathCounter"), 128, 128);
			this.rect = new me.Rect(this.pos, 128, 128);
			this.addShape(this.rect);
			this.imgSprite.addAnimation("flame",[0,1,2,3], 100);
			this.imgSprite.setCurrentAnimation("flame");
			this.deltaTime = 0;
			this.index = 0;
		},
		
		update : function () {
			
			this.deltaTime = this.deltaTime + me.timer.tick;
			
			if(this.deltaTime >= 4){
			
				this.imgSprite.setAnimationFrame(this.index);
				this.index++;
			
				if(this.index >= 5) {
					this.index = 0;
					this.imgSprite.setAnimationFrame(this.index);
					this.animate = false;
				}
				
				this.deltaTime = 0;
			}
			
			return true;
		},
		
		draw : function (context) {
			this.imgSprite.draw(context);
		}
	});
	
game.HUD.Textfield = me.Renderable.extend({
		init : function (x, y) {
			this.parent(new me.Vector2d(x, y), 10, 10);
			this.font = new me.BitmapFont("font", 32);
			this.font.set("right");
			this.deathCount = -1;
			this.floating = true;
		},
		
		update : function () {
			if(this.deathCount !== game.data.deathCounter) {
				this.deathCount = game.data.deathCounter;
				return true;
			}
			return false;
		},
		
		draw : function (context){
			this.font.draw(context, game.data.deathCounter, this.pos.x , this.pos.y);
		}
	});