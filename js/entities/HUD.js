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
			//this.addButton();
		},
		
		remove :  function () {
			me.game.world.removeChild(this);
		},
		
		addButton : function () {
			this.addChild(new game.HUD.InventoryButton(1024*2 - 256 , 768*2 - 128, {spritewidth: 256,spriteheight: 128}));
			this.addChild(new game.HUD.QuestsButton(1024*2 - 256 , 768*2 - 256, {spritewidth: 256,spriteheight: 128}));
		},
		
		addTextfield : function () {
			this.addChild(new game.HUD.Textfield(1000, 440));
		}
	});
	
/**
 *  A simple Button to load the inventory
 */
game.HUD.InventoryButton = me.ObjectEntity.extend({
		init : function (x, y, settings) {
			this.parent(x, y, settings);
			this.keyLock = true;
			this.floating = true;
			this.imgButton = new me.AnimationSheet(this.pos.x, this.pos.y, me.loader.getImage("inventoryButton"), 256, 128);
			//add Shape in MelonJS 1.0.0 for the collision box
			this.rect = new me.Rect(this.pos, 256, 128);
			this.addShape(this.rect);
		},

		update : function () {
			this.imgButton.setAnimationFrame(0);
			
			if (this.getShape().containsPointV(me.input.mouse.pos) && me.input.isKeyPressed("mouse/touch") && !this.keyLock) {
				this.keyLock = true;
				
				game.play.HUD.remove();
				game.play.addInventory();
				me.game.world.removeChild(this);
			}

			if (!me.input.isKeyPressed("mouse/touch")) {
				this.keyLock = false;
			}
			
			return true;
		},

		draw : function (context) {
			this.imgButton.draw(context);
		}
	});
	
/**
 *  A simple Button to load the Questlog
 */
game.HUD.QuestsButton = me.ObjectEntity.extend({
		init : function (x, y, settings) {
			this.parent(x, y, settings);
			this.keyLock = true;
			this.floating = true;
			this.imgButton = new me.AnimationSheet(this.pos.x, this.pos.y, me.loader.getImage("questButton"), 256, 128);
			//add Shape in MelonJS 1.0.0 for the collision box
			this.rect = new me.Rect(this.pos, 256, 128);
			this.addShape(this.rect);
		},

		update : function () {
			this.imgButton.setAnimationFrame(0);
			
			if (this.getShape().containsPointV(me.input.mouse.pos) && me.input.isKeyPressed("mouse/touch") && !this.keyLock) {
				this.keyLock = true;
				game.data.currentLevel = me.levelDirector.getCurrentLevelId();
				var player = me.game.world.getChildByName("playerObject");
				game.data.playerPosX = player[0].pos.x;
				game.data.playerPosY = player[0].pos.y;
				me.state.change(me.state.USER);
			}

			if (!me.input.isKeyPressed("mouse/touch")) {
				this.keyLock = false;
			}
			
			return true;
		},

		draw : function (context) {
			this.imgButton.draw(context);
		}
	});
	
/**
 *  A class to render a symbol above the NPC's head
 */
game.HUD.Questfield = me.Renderable.extend({
		init : function (x, y, drawText) {
			this.parent(new me.Vector2d(x, y), 10, 10 );
			this.font = new me.BitmapFont("font", 32);
			this.font.set("right");
			this.textDisplay = drawText;
			this.floating = false;
		},
		
		change : function(text){
			this.textDisplay = text;
		},
		
		draw : function (context){
			this.font.draw(context, this.textDisplay, this.pos.x , this.pos.y);
		}
	});
	
/**
 *  A simple textfield to display text when needed
 */
game.HUD.Textfield = me.Renderable.extend({
		init : function (x, y) {
			this.parent(new me.Vector2d(x, y), 10, 10 );
			this.font = new me.BitmapFont("font", 32);
			this.font.set("right");
			this.textDisplay;
			this.floating = false;
		},
		
		update : function () {
			if(this.textDisplay !== game.data.drawText) {
				this.textDisplay = game.data.drawText;
				return true;
			}
			return false;
		},
		
		draw : function (context){
			this.font.draw(context, game.data.drawText, this.pos.x , this.pos.y);
		}
	});